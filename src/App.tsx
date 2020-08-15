import React, { useState, useEffect, useMemo } from "react";
import { QueryRenderer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import createEnvironment from "./util/relay-environment";
import { createSchemaContext } from "earthstar-graphql";
import { AppQuery } from "./__generated__/AppQuery.graphql";
import MessageComposer from "./MessageComposer";
import WorkspaceMessages from "./WorkspaceMessages";
import SyncMutation from "./mutations/SyncMutation";
import { AuthorKeypair } from "earthstar";
import { isKeypair } from "./util/handy";
import { ThemeProvider, css } from "styled-components/macro";
import { lightTheme, makeThemeForFont } from "./themes";
import StatusBar from "./StatusBar";
import { WORKSPACE_ADDR, PUB_URL } from "./constants";

const App: React.FC = () => {
  // Preparing for later when you can have different workspaces
  const [workspaceAddr] = useState(WORKSPACE_ADDR);

  // This is a Relay environment, which is where Relay stores its data cache
  // and configurations for how to fetch data
  const [env] = useState(
    createEnvironment(
      createSchemaContext("MEMORY", {
        workspaceAddresses: [workspaceAddr],
      })
    )
  );

  // Try and get the author from localstorage.
  const initAuthor = useMemo(() => {
    const maybeSessionAuthor = localStorage.getItem("authorKeypair");

    if (!maybeSessionAuthor) {
      return null;
    }

    const parsed = JSON.parse(maybeSessionAuthor);

    if (parsed && !isKeypair(parsed)) {
      return null;
    }

    return parsed;
  }, []);

  const [author, setAuthor] = useState<AuthorKeypair | null>(initAuthor);

  // Write the current keypair to localstorage whenever the value changes
  useEffect(() => {
    localStorage.setItem("authorKeypair", JSON.stringify(author));
  }, [author]);

  // Stop the window from closing if there are unsynced changes.
  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (hasLocalWorkspaceChanges) {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  });

  // Sync with the pub once when the app starts up.
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

  // Using this to make the sticky header effects work well
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  return (
    // Pass a theme into the app for styled components to use.
    <ThemeProvider theme={makeThemeForFont("Gill Sans", lightTheme)}>
      {/* https://relay.dev/docs/en/query-renderer */}
      {/* Data for the app is fetched here from earthstar-graphql */}
      <QueryRenderer<AppQuery>
        environment={env}
        query={graphql`
          query AppQuery($workspace: String!, $authorAddress: String!) {
            workspace(address: $workspace) {
              # https://graphql.org/learn/queries/#fragments
              # Components declare their own data dependencies independently
              ...StatusBar_workspace @arguments(authorAddress: $authorAddress)
              ...WorkspaceMessages_workspace
              ...MessageComposer_workspace
            }
          }
        `}
        variables={{
          // Passed into the query above
          workspace: workspaceAddr,
          authorAddress: author?.address || "",
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
                font: ${(props) =>
                  `${props.theme.font.size}px ${props.theme.font.family}`};}
                  background: ${(props) => props.theme.colours.bg}
              `}
            >
              {/* I will probably put the stuff like author, setAuthor, hasLocalWorkspaceChanges etc into a React Context so I don't need to thread them through the whole app. */}
              <StatusBar
                author={author}
                setAuthor={setAuthor}
                workspace={props.workspace}
                setHeight={setStatusBarHeight}
                setHasLocalWorkspaceChanges={setHasLocalWorkspaceChanges}
                hasLocalWorkspaceChanges={hasLocalWorkspaceChanges}
              />
              {author ? (
                <MessageComposer
                  workspace={props.workspace}
                  setHasLocalWorkspaceChanges={setHasLocalWorkspaceChanges}
                  author={author}
                />
              ) : null}
              <WorkspaceMessages
                setHasLocalWorkspaceChanges={setHasLocalWorkspaceChanges}
                author={author}
                workspace={props.workspace}
                stickAt={statusBarHeight}
              />
            </div>
          ) : (
            <div>Couldn't find the workspace!</div>
          );
        }}
      />
    </ThemeProvider>
  );
};

export default App;
