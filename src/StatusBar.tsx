import React, { useState, useCallback, useEffect, useRef } from "react";
import { css } from "styled-components/macro";
import graphql from "babel-plugin-relay/macro";
import { createFragmentContainer, RelayProp } from "react-relay";
import { AuthorKeypair, generateAuthorKeypair, isErr } from "earthstar";
import { StatusBar_workspace } from "./__generated__/StatusBar_workspace.graphql";
import { getAuthorShortname, isKeypair } from "./util/handy";
import useInternetTime from "use-internet-time";
import NavButton from "./NavButton";
import Button from "./Button";
import { useDropzone } from "react-dropzone";
import { useDownload, usePrevious } from "./util/hooks";
import SyncMutation from "./mutations/SyncMutation";
import { PUB_URL } from "./App";
import ContextualPanel from "./ContextualPanel";

type StatusBarProps = {
  author: AuthorKeypair | null;
  setAuthor: (keypair: AuthorKeypair | null) => void;
  workspace: StatusBar_workspace;
  relay: RelayProp;
  setHeight: (height: number) => void;
  hasLocalWorkspaceChanges: boolean;
  setHasLocalWorkspaceChanges: (hasChanges: boolean) => void;
};

type Panel = "workspace" | "author" | "no-identity";

const StatusBar: React.FC<StatusBarProps> = ({
  workspace,
  author,
  setAuthor,
  relay,
  setHeight,
  setHasLocalWorkspaceChanges,
  hasLocalWorkspaceChanges,
}) => {
  const [openPanel, setOpenPanel] = useState<Panel | null>(null);

  const setPanel = (panel: Panel | null) => {
    setOpenPanel((prev) => {
      if (prev === panel) {
        return null;
      }

      return panel;
    });
  };

  const isAuthorDefined = author !== null;

  useEffect(() => {
    setPanel(null);
  }, [isAuthorDefined]);

  const onDrop = useCallback(
    (accepted, _rejected) => {
      if (accepted.length === 0) {
        return;
      }

      const fileToRead = accepted[0];

      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;

        if (typeof result !== "string") {
          alert("Please upload a keypair.json");
          return;
        }

        const maybeKeypair = JSON.parse(result);

        if (!isKeypair(maybeKeypair)) {
          alert("Please upload a valid keypair.");
          return;
        }

        setAuthor(maybeKeypair);
      };

      reader.readAsText(fileToRead);
    },
    [setAuthor]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: () => alert("Please drop a keypair.json here!"),
    accept: "application/json",
  });

  const download = useDownload(JSON.stringify(author), "keypair.json");

  const workspaceNameRef = useRef(null);
  const authorRef = useRef(null);

  const prevOpenPanel = usePrevious(openPanel);

  const measuredRef = useCallback(
    (node) => {
      if (node !== null && prevOpenPanel !== openPanel) {
        setHeight(node.getBoundingClientRect().height);
      }
    },
    [prevOpenPanel, openPanel, setHeight]
  );

  return (
    <div
      css={css`
        position: sticky;
        z-index: 1;
        top: 0;
        background: ${(props) => props.theme.colours.bg};
        border-bottom: 1px solid ${(props) => props.theme.colours.fgHint};
      `}
      ref={measuredRef}
    >
      {openPanel !== null ? (
        <ContextualPanel
          pointsToRef={openPanel === "workspace" ? workspaceNameRef : authorRef}
          accentColour={"blue"}
        >
          {openPanel === "workspace" ? (
            <>
              <Button
                onClick={() => {
                  SyncMutation.commit(
                    relay.environment,
                    {
                      pubUrl: PUB_URL,
                      workspace: workspace.address,
                      format: "GRAPHQL",
                    },
                    () => {
                      console.log("Sync Complete ✅");
                      setHasLocalWorkspaceChanges(false);
                    }
                  );
                }}
              >
                Sync this workspace
              </Button>
              {" or "}
              <Button>View another one</Button>
            </>
          ) : openPanel === "no-identity" ? (
            <div
              css={`
                text-align: right;
              `}
            >
              <span {...getRootProps()}>
                <input {...getInputProps()} />
                <Button>
                  {isDragActive ? "Drop keypair.json" : "Use a keypair.json"}
                </Button>
              </span>
              {" or "}{" "}
              <Button
                onClick={() => {
                  const name = window.prompt(
                    "Please enter a shortname of exactly four lowercase letters",
                    ""
                  );

                  if (name === null) {
                    alert("You'll need to enter a name.");
                    return;
                  }

                  const keypair = generateAuthorKeypair(name);

                  if (isErr(keypair)) {
                    alert(keypair.message);
                    return;
                  }

                  setAuthor(keypair);
                  setPanel(null);
                }}
              >
                Make a new one
              </Button>
            </div>
          ) : (
            <div
              css={`
                text-align: right;
              `}
            >
              <Button onClick={download}>Download your keypair.json</Button>
              {" or "}
              <Button
                onClick={() => {
                  setAuthor(null);
                  setPanel(null);
                }}
              >
                Sign out
              </Button>
            </div>
          )}
        </ContextualPanel>
      ) : null}
      <div
        css={`
          display: flex;
          justify-content: space-between;
          padding: 12px 8px;
          align-items: baseline;
        `}
      >
        <NavButton
          ref={workspaceNameRef}
          onClick={() => setPanel("workspace")}
          accent={"green"}
        >
          {`+${workspace.name}`}
          {hasLocalWorkspaceChanges ? (
            <span
              css={`
                color: green;
              `}
            >
              {" has unsynced changes"}
            </span>
          ) : null}
        </NavButton>
        <div
          css={`
            display: flex;
          `}
        >
          <NavButton
            onClick={() => setPanel(author ? "author" : "no-identity")}
            ref={authorRef}
            css={{ marginRight: 4 }}
            accent={"blue"}
            title={author ? author.address : undefined}
          >
            {author ? getAuthorShortname(author.address) : "Not Signed In"}
          </NavButton>
          <InternetClock />
        </div>
      </div>
    </div>
  );
};

export default createFragmentContainer(StatusBar, {
  workspace: graphql`
    fragment StatusBar_workspace on Workspace {
      address
      name
    }
  `,
});

function InternetClock() {
  const time = useInternetTime({ fractional: true });

  return (
    <div
      css={`
        font-feature-settings: "tnum";
        font-variant-numeric: tabular-nums;
      `}
    >
      {time}
    </div>
  );
}
