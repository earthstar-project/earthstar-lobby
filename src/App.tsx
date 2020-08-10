import React, { useState, useEffect } from "react";
import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import createEnvironment from "./util/relay-environment";
import { createSchemaContext } from "earthstar-graphql";
import { AppQuery } from "./__generated__/AppQuery.graphql";
import MessageComposer from "./MessageComposer";
import WorkspaceMessages from "./WorkspaceMessages";
import SyncMutation from "./mutations/SyncMutation";
import WorkspaceHeading from "./WorkspaceHeading";

const WORKSPACE_ADDR = "+lobbydev.a1";
export const PUB_URL = "https://earthstar-graphql-pub.glitch.me";

const AUTHOR = {
  address: "@gwil.b63a5eqlqqkv5im37s6vebgf3ledhkyt63gzt4ylvcyatlxmrprma",
  secret: "b5nb2ii7lkmreavhwuxbmqxe4fw7p7okomf2eepjjty2jyndixbna",
};

function App() {
  const [workspaceAddr] = useState(WORKSPACE_ADDR);

  const [env] = useState(
    createEnvironment(
      createSchemaContext("MEMORY", {
        workspaceAddresses: [workspaceAddr],
      })
    )
  );

  useEffect(() => {
    const disposable = SyncMutation.commit(
      env,
      {
        pubUrl: PUB_URL,
        workspace: WORKSPACE_ADDR,
        format: "GRAPHQL",
      },
      () => {
        console.log("Inital sync ✅");
      }
    );

    return () => disposable.dispose();
  }, [env]);

  const [hasLocalWorkspaceChanges, setHasLocalWorkspaceChanges] = useState(
    false
  );

  return (
    <QueryRenderer<AppQuery>
      environment={env}
      query={graphql`
        query AppQuery($workspace: String!) {
          workspace(address: $workspace) {
            ...WorkspaceHeading_workspace
            ...WorkspaceMessages_workspace
            ...MessageComposer_workspace
          }
        }
      `}
      variables={{
        workspace: workspaceAddr,
      }}
      render={({ error, props }) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        return props.workspace ? (
          <div>
            <WorkspaceHeading
              workspace={props.workspace}
              hasLocalWorkspaceChanges={hasLocalWorkspaceChanges}
              setHasLocalWorkspaceChanges={setHasLocalWorkspaceChanges}
            />
            <MessageComposer
              workspace={props.workspace}
              setHasLocalWorkspaceChanges={setHasLocalWorkspaceChanges}
              author={AUTHOR}
            />
            <WorkspaceMessages
              setHasLocalWorkspaceChanges={setHasLocalWorkspaceChanges}
              author={AUTHOR}
              workspace={props.workspace}
            />
          </div>
        ) : (
          <div>Couldn't find the workspae!</div>
        );
      }}
    />
  );
}

export default App;
