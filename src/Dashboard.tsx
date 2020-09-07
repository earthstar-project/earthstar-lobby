import React, { useState } from "react";
import { QueryRenderer, Environment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { css } from "styled-components/macro";
import { WindupChildren } from "windups";

import StatusBar from "./NewStatusBar";
import AuthorStatusBit from "./AuthorStatusBit";
import MaxWidth from "./MaxWidth";
import NavButton from "./NavButton";
import WorkspaceSummary from "./WorkspaceSummary";

import ContextualPanel from "./ContextualPanel";
import Button from "./Button";
import TextInput from "./TextInput";
import AddWorkspaceMutation from "./mutations/AddWorkspaceMutation";

import { usePersistWorkspace } from "./util/hooks";

import { DashboardQuery } from "./__generated__/DashboardQuery.graphql";

type DashboardProps = {
  relayEnv: Environment;
};

const Dashboard = ({ relayEnv }: DashboardProps) => {
  const [titleNode, setTitleNode] = useState<HTMLButtonElement | null>(null);

  const [workspaceOptionsPanel, setWorkspaceOptionsPanel] = useState<
    "none" | "options" | "add-workspace"
  >("none");

  const [manualWorkspaceAddress, setManualWorkspaceAddress] = useState("");

  const addWorkspace = usePersistWorkspace();

  return (
    <>
      <StatusBar
        leftChildren={
          <WindupChildren>{"greetings from the lobby"}</WindupChildren>
        }
        rightChildren={<AuthorStatusBit />}
      />
      <QueryRenderer<DashboardQuery>
        environment={relayEnv}
        query={graphql`
          query DashboardQuery {
            workspaces {
              address
              ...WorkspaceSummary_workspace
            }
          }
        `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>{"Error!"}</div>;
          }

          if (!props) {
            return <div>{"Initialising..."}</div>;
          }

          return (
            <>
              {workspaceOptionsPanel !== "none" ? (
                <ContextualPanel
                  accentColour={"alpha"}
                  pointsToNode={titleNode}
                >
                  {workspaceOptionsPanel === "options" ? (
                    <>
                      <Button>{"Sync all"}</Button>
                      {" or "}
                      <Button
                        onClick={() => {
                          setWorkspaceOptionsPanel("add-workspace");
                        }}
                      >
                        {"Add a new workspace"}
                      </Button>
                    </>
                  ) : null}
                  {workspaceOptionsPanel === "add-workspace" ? (
                    <>
                      <TextInput
                        placeholder={"+example.a123"}
                        value={manualWorkspaceAddress}
                        onChange={(e) =>
                          setManualWorkspaceAddress(e.target.value)
                        }
                      />
                      <Button
                        onClick={() => {
                          AddWorkspaceMutation.commit(
                            relayEnv,
                            {
                              workspaceAddress: manualWorkspaceAddress,
                            },
                            (res) => {
                              if (
                                res.addWorkspace &&
                                res.addWorkspace.__typename ===
                                  "WorkspaceExistsResult"
                              ) {
                                alert(
                                  `${res.addWorkspace.workspace.address} has already been added`
                                );
                                return;
                              }

                              if (
                                res.addWorkspace &&
                                res.addWorkspace.__typename ===
                                  "NotPermittedResult"
                              ) {
                                alert(`Error: ${res.addWorkspace.reason}`);
                                return;
                              }

                              if (
                                res.addWorkspace &&
                                res.addWorkspace.__typename ===
                                  "WorkspaceAddedResult"
                              ) {
                                setWorkspaceOptionsPanel("none");
                                setManualWorkspaceAddress("");

                                const { address } = res.addWorkspace.workspace;

                                addWorkspace(address);
                              }
                            }
                          );
                        }}
                      >
                        {"Add workspace manually"}
                      </Button>
                    </>
                  ) : null}
                </ContextualPanel>
              ) : null}
              <MaxWidth>
                <div
                  css={css`
                    margin: 1em 0;
                  `}
                >
                  <b>{"My Workspaces "}</b>
                  <NavButton
                    accent={"alpha"}
                    ref={(inst) => setTitleNode(inst)}
                    onClick={() => {
                      setWorkspaceOptionsPanel((prev) =>
                        prev !== "none" ? "none" : "options"
                      );
                    }}
                  >
                    {"Options"}
                  </NavButton>
                </div>
              </MaxWidth>
              <ul
                css={css`
                  margin: 0;
                  padding: 0;
                `}
              >
                {props.workspaces.map((ws) => {
                  return (
                    <div
                      key={ws.address}
                      css={css`
                        margin-bottom: 1em;
                      `}
                    >
                      <WorkspaceSummary workspace={ws} />
                    </div>
                  );
                })}
              </ul>
            </>
          );
        }}
      />
    </>
  );
};

export default Dashboard;
