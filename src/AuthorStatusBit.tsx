import React, { useContext, useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { useDropzone } from "react-dropzone";
import { useDownload } from "./util/hooks";
import { css } from "styled-components/macro";
import useInternetTime from "use-internet-time";
import { generateAuthorKeypair, isErr } from "earthstar";

import NavButton from "./NavButton";
import AuthorIdenticon from "./AuthorIdenticon";
import { LobbyContext } from "./util/lobby-context";
import { getAuthorShortname, isKeypair } from "./util/handy";
import { WorkspaceViewerContext } from "./WorkspaceViewer";
import ContextualPanel from "./ContextualPanel";
import Button from "./Button";
import TextInput from "./TextInput";
import { StatusBarContext } from "./NewStatusBar";

const AuthorStatusBit = () => {
  const { author, setAuthor } = useContext(LobbyContext);
  const { setToWorkspace } = useContext(WorkspaceViewerContext);

  const isAuthorDefined = author !== null;

  const { setPanelState, panelNode, panelState, isOn } = useContext(
    StatusBarContext
  );

  // Close the contextual panel if the author changes (i.e. signs out or in)
  useEffect(() => {
    setPanelState("NONE");
  }, [isAuthorDefined, setPanelState]);

  // What to do when a keypair is uploaded
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

  // Creates a fn to trigger a virtual download of the keypair
  const download = useDownload(JSON.stringify(author), "keypair.json");

  // State for display name
  const [newDisplayName, setNewDisplayName] = useState("");

  const [internalPanelState, setInternalPanelState] = useState<
    "author-management" | "no-identity" | "author-options"
  >(author ? "author-options" : "no-identity");

  const [authorNode, setAuthorNode] = useState<HTMLDivElement | null>(null);

  return (
    <>
      {createPortal(
        <ContextualPanel accentColour={"beta"} pointsToNode={authorNode}>
          {internalPanelState === "no-identity" ? (
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
                  setPanelState("NONE");
                }}
              >
                Make a new one
              </Button>
            </div>
          ) : null}
          {internalPanelState === "author-management" ? (
            <div
              css={`
                display: flex;
                flex-direction: column;
                align-items: flex-end;
              `}
            >
              <div>
                <TextInput
                  placeholder={"Enter a display name"}
                  value={newDisplayName}
                  onChange={(e) => {
                    setNewDisplayName(e.target.value);
                  }}
                />
                <Button
                  onClick={() => {
                    setPanelState("NONE");

                    if (author) {
                      setToWorkspace(
                        newDisplayName,
                        `/about/${author.address}/name`
                      );
                    }
                  }}
                >
                  Set display name
                </Button>
              </div>
              <p>or</p>
              <Button onClick={download}>Download your keypair.json</Button>
            </div>
          ) : null}
          {internalPanelState === "author-options" ? (
            <div
              css={`
                text-align: right;
              `}
            >
              <Button
                onClick={() => setInternalPanelState("author-management")}
              >
                Manage your identity
              </Button>
              {" or "}
              <Button
                onClick={() => {
                  setAuthor(null);
                  setPanelState("NONE");
                }}
              >
                Sign out
              </Button>
            </div>
          ) : null}
        </ContextualPanel>,
        panelNode
      )}
      <div
        css={`
          display: flex;
        `}
      >
        <div
          ref={(inst) => setAuthorNode(inst)}
          css={`
            margin-right: 4px;
          `}
        >
          <NavButton
            onClick={() => {
              console.log({ isOn, panelState });
              if (panelState === isOn) {
                setInternalPanelState(
                  author ? "author-options" : "no-identity"
                );
                console.log("uh");
              }
              setPanelState(isOn);
            }}
            css={{ marginRight: 4 }}
            accent={"beta"}
            title={author ? author.address : undefined}
          >
            {author ? getAuthorShortname(author.address) : "Not Signed In"}
          </NavButton>
          {author ? <AuthorIdenticon address={author.address} /> : null}
        </div>
        {/* Welcome to the new millennium */}
        <InternetClock />
      </div>
    </>
  );
};

export default AuthorStatusBit;

function InternetClock() {
  const time = useInternetTime({ fractional: true });

  return (
    <div
      css={css`
        font-feature-settings: "tnum";
        font-variant-numeric: tabular-nums;
        color: ${(props) => props.theme.colours.fgHint};
      `}
    >
      {time}
    </div>
  );
}
