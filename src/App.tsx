import React, { useState, useEffect, useMemo, useRef } from "react";
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

const WORKSPACE_ADDR = "+lobbydev.a1";
export const PUB_URL = "https://earthstar-graphql-pub.glitch.me";

function App() {
  const [workspaceAddr] = useState(WORKSPACE_ADDR);

  const [env] = useState(
    createEnvironment(
      createSchemaContext("MEMORY", {
        workspaceAddresses: [workspaceAddr],
      })
    )
  );

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

  useEffect(() => {
    localStorage.setItem("authorKeypair", JSON.stringify(author));
  }, [author]);

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

  const [statusBarHeight, setStatusBarHeight] = useState(0);

  return (
    <ThemeProvider theme={makeThemeForFont("Gill Sans", lightTheme)}>
      <QueryRenderer<AppQuery>
        environment={env}
        query={graphql`
          query AppQuery($workspace: String!) {
            workspace(address: $workspace) {
              ...StatusBar_workspace
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
            <div
              css={css`
                font: ${(props) =>
                  `${props.theme.font.size}px ${props.theme.font.family}`};
              `}
            >
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
            <div>Couldn't find the workspae!</div>
          );
        }}
      />
    </ThemeProvider>
  );
}

export default App;
