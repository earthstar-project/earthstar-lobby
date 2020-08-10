import React, { useState } from "react";
import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import createEnvironment from "./util/relay-environment";
import { createSchemaContext } from "earthstar-graphql";
import { AppQuery } from "./__generated__/AppQuery.graphql";
import MessageComposer from "./MessageComposer";
import WorkspaceMessages from "./WorkspaceMessages";

const WORKSPACE_ADDR = "+lobbydev.a1";

function App() {
  const [workspaceAddr] = useState(WORKSPACE_ADDR);

  const [env] = useState(
    createEnvironment(
      createSchemaContext("MEMORY", {
        workspaceAddresses: [workspaceAddr],
      })
    )
  );

  return (
    <QueryRenderer<AppQuery>
      environment={env}
      query={graphql`
        query AppQuery($workspace: String!) {
          workspace(address: $workspace) {
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
            <MessageComposer workspace={props.workspace} />
            <WorkspaceMessages workspace={props.workspace} />
          </div>
        ) : (
          <div>Couldn't find the workspae!</div>
        );
      }}
    />
  );
}

export default App;
