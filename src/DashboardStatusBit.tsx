import React, { useContext, useState } from "react";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { css } from "styled-components/macro";
import { createPortal } from "react-dom";
import { WindupChildren } from "windups";
import { isGraphQlPub } from "earthstar-graphql";

import NavButton from "./NavButton";
import Button from "./Button";
import TextInput from "./TextInput";
import LabelledElement from "./LabelledElement";
import ContextualPanel from "./ContextualPanel";
import { StatusBarContext } from "./NewStatusBar";
import { usePubs, useTempString } from "./util/hooks";

import SyncMutation from "./mutations/SyncMutation";
import AddWorkspaceMutation from "./mutations/AddWorkspaceMutation";

import { DashboardStatusBit_rootQuery } from "./__generated__/DashboardStatusBit_rootQuery.graphql";

type DashboardStatusBitProps = {
  relay: RelayProp;
  rootQuery: DashboardStatusBit_rootQuery;
};

const DashboardStatusBit = ({ relay, rootQuery }: DashboardStatusBitProps) => {
  const { setPanelState, panelNode, panelState, isOn } = useContext(
    StatusBarContext
  );

  const [workspaceOptionsPanel, setWorkspaceOptionsPanel] = useState<
    "options" | "add-workspace"
  >("options");

  const [pubs, setPubs] = usePubs();

  const addPub = (workspace: string, pubToAdd: string) => {
    setPubs((prev) => {
      const currentPubs = prev[workspace] || [];

      return {
        ...prev,
        [workspace]: Array.from(new Set([...currentPubs, pubToAdd])),
      };
    });
  };

  const [manualWorkspaceAddress, setManualWorkspaceAddress] = useState("");
  const [manualPubAddress, setManualPubAddress] = useState("");

  const [titleNode, setTitleNode] = useState<HTMLElement | null>(null);

  const [status, setStatus] = useTempString();

  return (
    <>
      {createPortal(
        <ContextualPanel accentColour={"alpha"} pointsToNode={titleNode}>
          {workspaceOptionsPanel === "options" ? (
            <>
              <Button
                onClick={async () => {
                  setPanelState("NONE");
                  setStatus("Syncing all workspaces...");

                  await Promise.all(
                    rootQuery.workspaces.map((ws) => {
                      return new Promise((res) => {
                        SyncMutation.commit(
                          relay.environment,
                          {
                            workspace: ws.address,
                            pubUrls: pubs[ws.address] || [],
                          },
                          () => {
                            res();
                          }
                        );
                      });
                    })
                  );

                  setStatus("Synced all workspaces!");
                }}
              >
                {"Sync all workspaces"}
              </Button>
              {" or "}
              <Button
                onClick={() => {
                  setWorkspaceOptionsPanel("add-workspace");
                }}
              >
                {"Add another one"}
              </Button>
            </>
          ) : null}
          {workspaceOptionsPanel === "add-workspace" ? (
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: flex-start;
              `}
            >
              <div
                css={css`
                  display: flex;
                  margin-bottom: 0.5em;
                `}
              >
                <div
                  css={css`
                    margin-right: 0.5em;
                  `}
                >
                  <LabelledElement label={"Workspace address"}>
                    <TextInput
                      placeholder={"+example.a123"}
                      value={manualWorkspaceAddress}
                      onChange={(e) =>
                        setManualWorkspaceAddress(e.target.value)
                      }
                    />
                  </LabelledElement>
                </div>
                <LabelledElement label={"Pub address"}>
                  <TextInput
                    placeholder={"https://my.pub"}
                    value={manualPubAddress}
                    onChange={(e) => setManualPubAddress(e.target.value)}
                  />
                </LabelledElement>
              </div>
              <Button
                onClick={() => {
                  if (
                    manualWorkspaceAddress.length < 4 ||
                    manualPubAddress.length < 3
                  ) {
                    alert("Please enter a workspace address and pub!");
                    return;
                  }

                  AddWorkspaceMutation.commit(
                    relay.environment,
                    {
                      workspaceAddress: manualWorkspaceAddress,
                    },
                    (res) => {
                      if (
                        res.addWorkspace &&
                        res.addWorkspace.__typename === "WorkspaceExistsResult"
                      ) {
                        alert(
                          `${res.addWorkspace.workspace.address} has already been added`
                        );
                        return;
                      }

                      if (
                        res.addWorkspace &&
                        res.addWorkspace.__typename === "NotPermittedResult"
                      ) {
                        alert(`Error: ${res.addWorkspace.reason}`);
                        return;
                      }

                      if (
                        res.addWorkspace &&
                        res.addWorkspace.__typename === "WorkspaceAddedResult"
                      ) {
                        const { address } = res.addWorkspace.workspace;
                        addPub(address, manualPubAddress);
                        setPanelState("NONE");
                        setManualWorkspaceAddress("");
                        setManualPubAddress("");
                        setStatus(`Added ${address}`);

                        SyncMutation.commit(
                          relay.environment,
                          {
                            workspace: address,
                            pubUrls: [manualPubAddress],
                          },
                          (res) => {
                            // For now, attempt to create the pub if it doesn't exist on a GraphQL pub
                            if (res.syncWithPubs.__typename === "SyncReport") {
                              res.syncWithPubs.pubSyncResults.forEach(
                                (result) => {
                                  if (
                                    result.reason ===
                                      "The pub didn't have the workspace requested" &&
                                    isGraphQlPub(result.pubUrl as string)
                                  ) {
                                    fetch(result.pubUrl as string, {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        query: `mutation AddWorkspace($workspaceAddress: String!) {
                                          addWorkspace(workspaceAddress: $workspaceAddress) {
                                            __typename
                                          }
                                        }`,
                                        variables: {
                                          workspaceAddress: address,
                                        },
                                      }),
                                    });
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }}
              >
                {"Add workspace"}
              </Button>
            </div>
          ) : null}
        </ContextualPanel>,
        panelNode
      )}
      <div
        ref={(inst) => {
          if (inst) {
            setTitleNode(inst);
          }
        }}
      >
        {status ? (
          <WindupChildren>{status}</WindupChildren>
        ) : (
          <NavButton
            onClick={() => {
              if (panelState === isOn) {
                setWorkspaceOptionsPanel("options");
              }
              setPanelState(isOn);
            }}
            accent={"alpha"}
          >
            <WindupChildren>{"greetings from the lobby"}</WindupChildren>
          </NavButton>
        )}
      </div>
    </>
  );
};

export default createFragmentContainer(DashboardStatusBit, {
  rootQuery: graphql`
    fragment DashboardStatusBit_rootQuery on Query {
      workspaces {
        address
      }
    }
  `,
});
