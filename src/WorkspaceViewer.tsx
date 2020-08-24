import React, { useState, useEffect, useContext } from "react";
import { QueryRenderer } from "react-relay";
import { Environment } from "relay-runtime";
import { css } from "styled-components/macro";
import graphql from "babel-plugin-relay/macro";

import StatusBar from "./StatusBar";
import MessageComposer from "./MessageComposer";
import WorkspaceMessages from "./WorkspaceMessages";

import SyncMutation from "./mutations/SyncMutation";
import { LobbyContext } from "./util/lobby-context";

import { WorkspaceViewerQuery } from "./__generated__/WorkspaceViewerQuery.graphql";

import { PUB_URL } from "./constants";

type WorkspaceViewerProps = {
  workspaceAddress: string;
  relayEnv: Environment;
};

const WorkspaceViewer: React.FC<WorkspaceViewerProps> = ({
  workspaceAddress,
  relayEnv,
}) => {
  // Sync with the pub once when the app starts up.
  useEffect(() => {
    const disposable = SyncMutation.commit(
      relayEnv,
      {
        pubUrl: PUB_URL,
        workspace: workspaceAddress,
      },
      () => {
        console.log("Inital sync ✅");
      }
    );

    return () => disposable.dispose();
  }, [relayEnv]);

  const [isWorkspaceDirty, setIsWorkspaceDirty] = useState(false);

  // Stop the window from closing if there are unsynced changes.
  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (isWorkspaceDirty) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  });

  const { author } = useContext(LobbyContext);

  return (
    /* https://relay.dev/docs/en/query-renderer */
    /* Data for the app is fetched here from earthstar-graphql */

    <QueryRenderer<WorkspaceViewerQuery>
      environment={relayEnv}
      query={graphql`
        query WorkspaceViewerQuery($workspace: String!) {
          workspace(address: $workspace) {
            # https://graphql.org/learn/queries/#fragments
            # Components declare their own data dependencies independently
            ...StatusBar_workspace
            ...WorkspaceMessages_workspace
            ...MessageComposer_workspace
          }
        }
      `}
      variables={{
        // Passed into the query above
        workspace: workspaceAddress,
      }}
      render={({ error, props }) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        return props.workspace ? (
          <div
            css={css`
				font: ${(props) => `${props.theme.font.size}px ${props.theme.font.family}`};}
				  background: ${(props) => props.theme.colours.bg}
			  `}
          >
            <StatusBar
              isWorkspaceDirty={isWorkspaceDirty}
              setIsWorkspaceDirty={setIsWorkspaceDirty}
              workspace={props.workspace}
            />
            {author ? (
              <MessageComposer
                setIsWorkspaceDirty={setIsWorkspaceDirty}
                workspace={props.workspace}
                author={author}
              />
            ) : null}
            <WorkspaceMessages
              setIsWorkspaceDirty={setIsWorkspaceDirty}
              workspace={props.workspace}
            />
          </div>
        ) : (
          <div>Couldn't find the workspace!</div>
        );
      }}
    />
  );
};

export default WorkspaceViewer;
