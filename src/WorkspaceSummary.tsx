import React, { useContext, useState } from "react";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { css } from "styled-components/macro";

import MaxWidth from "./MaxWidth";
import NavButton from "./NavButton";
import Button from "./Button";
import AuthorIdenticon from "./AuthorIdenticon";
import ContextualPanel from "./ContextualPanel";
import { LobbyContext } from "./util/lobby-context";
import { useWindupAlert, usePubs } from "./util/hooks";
import TextInput from "./TextInput";

import SyncManyMutation from "./mutations/SyncManyMutation";

import { WorkspaceSummary_workspace } from "./__generated__/WorkspaceSummary_workspace.graphql";

const PubEditor = ({ workspace }: { workspace: string }) => {
  const [pubs, setPubs] = usePubs();
  const [newPub, setNewPub] = useState("");
  const remove = (pubToRemove: string) => {
    setPubs((prev) => {
      const currentPubs = prev[workspace] || [];

      return {
        ...prev,
        [workspace]: (currentPubs || []).filter((pub) => pub !== pubToRemove),
      };
    });
  };
  const add = (pubToAdd: string) => {
    setNewPub("");
    setPubs((prev) => {
      const currentPubs = prev[workspace] || [];

      return {
        ...prev,
        [workspace]: Array.from(new Set([...(currentPubs || []), pubToAdd])),
      };
    });
  };

  return (
    <>
      {pubs[workspace]
        ? pubs[workspace].map((pub) => {
            return (
              <li
                css={css`
                  display: flex;
                  justify-content: space-between;
                  align-items: baseline;
                  margin-bottom: 0.5em;
                `}
              >
                {pub}
                <Button
                  onClick={() => {
                    remove(pub);
                  }}
                >
                  {"Remove"}
                </Button>
              </li>
            );
          })
        : null}
      <TextInput
        placeholder={"https://my.pub"}
        value={newPub}
        onChange={(e) => setNewPub(e.target.value)}
      />
      <Button
        onClick={() => {
          add(newPub);
        }}
      >
        {"Add pub"}
      </Button>
    </>
  );
};

type WorkspaceSummaryProps = {
  relay: RelayProp;
  workspace: WorkspaceSummary_workspace;
};

type PanelState = "options" | "pubs" | "closed";

const WorkspaceSummary: React.FC<WorkspaceSummaryProps> = ({
  workspace,
  relay,
}) => {
  const { appStateDispatch } = useContext(LobbyContext);

  const firstThreePosts = workspace.documents.slice(0, 3);

  const [
    workspaceNameNode,
    setWorkspaceNameNode,
  ] = useState<HTMLElement | null>(null);

  const [panelState, setPanelState] = useState<PanelState>("closed");

  const [tempMessage, setTempMessage] = useWindupAlert();

  const [pubs] = usePubs();

  return (
    <>
      {panelState !== "closed" ? (
        <ContextualPanel
          accentColour={"alpha"}
          pointsToNode={workspaceNameNode}
        >
          {panelState === "options" ? (
            <>
              {pubs ? (
                <>
                  <Button
                    onClick={() => {
                      setPanelState("closed");
                      setTempMessage("is syncing...");
                      SyncManyMutation.commit(
                        relay.environment,
                        {
                          workspaces: [
                            {
                              address: workspace.address,
                              pubs: pubs[workspace.address] || [],
                            },
                          ],
                        },
                        (res) => {
                          if (res.syncMany[0].__typename === "SyncError") {
                            return;
                          }

                          setTempMessage("was synced");
                        }
                      );
                    }}
                  >
                    {"Sync"}
                  </Button>
                  {" or "}
                </>
              ) : null}
              <Button onClick={() => setPanelState("pubs")}>
                {"Edit Pubs"}
              </Button>
              {" or "}
              <Button>{"Remove"}</Button>
            </>
          ) : null}
          {panelState === "pubs" ? (
            <PubEditor workspace={workspace.address} />
          ) : null}
        </ContextualPanel>
      ) : null}

      <MaxWidth>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          `}
        >
          <div>
            <NavButton
              onClick={() => {
                setPanelState((prev) =>
                  prev !== "closed" ? "closed" : "options"
                );
              }}
              ref={(inst) => setWorkspaceNameNode(inst)}
              accent={"alpha"}
            >
              <b>{workspace.name}</b>
            </NavButton>
            <span
              css={css`
                color: ${(props) => props.theme.colours.fgHint};
              `}
            >
              {tempMessage
                ? ` ${tempMessage}`
                : pubs[workspace.address] === undefined ||
                  pubs[workspace.address].length === 0
                ? " has no pubs!"
                : ` ${workspace.population} members`}
            </span>
          </div>
          <Button
            css={css`
              margin-left: 8px;
            `}
            onClick={() => {
              appStateDispatch({
                type: "OPEN_WORKSPACE",
                address: workspace.address,
              });
            }}
          >
            {"Open"}
          </Button>
        </div>
        {firstThreePosts.map((post) => {
          if (post.__typename === "ES4Document") {
            return (
              <div
                css={css`
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                `}
              >
                <span
                  css={css`
                    color: ${(props) => props.theme.colours.fgHint};
                  `}
                >
                  {post.author.shortName}{" "}
                  <AuthorIdenticon address={post.author.address} />{" "}
                </span>
                {post.content}
              </div>
            );
          }
          return null;
        })}
      </MaxWidth>
    </>
  );
};

export default createFragmentContainer(WorkspaceSummary, {
  workspace: graphql`
    fragment WorkspaceSummary_workspace on Workspace {
      name
      address
      population
      documents(sortedBy: NEWEST, pathPrefixes: ["/lobby"]) {
        __typename
        ... on ES4Document {
          id
          content
          author {
            shortName
            address
          }
        }
      }
    }
  `,
});
