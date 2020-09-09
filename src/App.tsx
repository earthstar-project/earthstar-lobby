import React, { useState, useEffect, useReducer } from "react";
import createEnvironment from "./util/relay-environment";
import { createSchemaContext } from "earthstar-graphql";
import { AuthorKeypair } from "earthstar";
import { ThemeProvider, css, createGlobalStyle } from "styled-components/macro";
import SyncMutation from "./mutations/SyncMutation";
import { lightTheme, makeThemeForFont, darkTheme } from "./themes";
import { useModeSelector } from "use-light-switch";
import WorkspaceViewer from "./WorkspaceViewer";
import { LobbyContext } from "./util/lobby-context";
import Dashboard from "./Dashboard";
import {
  usePersistedAuthor,
  useWorkspacesFromStorage,
  usePersistingWorkspacesAndPubs,
  usePubsFromStorage,
  StorageContext,
} from "./util/hooks";

type AppState =
  | { screen: "WORKSPACE"; address: string }
  | { screen: "DASHBOARD" };

export type AppAction =
  | { type: "OPEN_WORKSPACE"; address: string }
  | { type: "OPEN_DASHBOARD" };

function appStateReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "OPEN_WORKSPACE":
      return { screen: "WORKSPACE", address: action.address };
    case "OPEN_DASHBOARD":
      return { screen: "DASHBOARD" };
    default:
      return state;
  }
}

const App: React.FC = () => {
  // Dark or light mode
  const theme = useModeSelector({
    light: lightTheme,
    dark: darkTheme,
    unset: lightTheme,
  });

  const [appState, dispatch] = useReducer(appStateReducer, {
    screen: "DASHBOARD",
  });

  const persistedWorkspaces = useWorkspacesFromStorage();
  const persistedPubs = usePubsFromStorage();

  // Try and get workspaces from localstorage
  const {
    workspaces,
    pubs,
    setWorkspaces,
    setPubs,
  } = usePersistingWorkspacesAndPubs();

  // This is a Relay environment, which is where Relay stores its data cache
  // and configurations for how to fetch data
  const [env] = useState(
    createEnvironment(
      createSchemaContext("MEMORY", {
        workspaceAddresses: workspaces,
      })
    )
  );

  useEffect(() => {
    Promise.all(
      persistedWorkspaces.map((ws) => {
        return new Promise((res) => {
          SyncMutation.commit(
            env,
            {
              workspace: ws,
              pubUrls: persistedPubs[ws] || [],
            },
            () => {
              res();
            }
          );
        });
      })
    );
  }, [env, persistedWorkspaces, pubs]);

  // Try and get the author from localstorage.
  const initAuthor = usePersistedAuthor();

  const [author, setAuthor] = useState<AuthorKeypair | null>(initAuthor);

  // Write the current keypair to localstorage whenever the value changes
  useEffect(() => {
    localStorage.setItem("authorKeypair", JSON.stringify(author));
  }, [author]);

  // Using this to make the sticky header effects work well
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  const GlobalStyle = createGlobalStyle`
    html, body {
      background: ${(props) => props.theme.colours.bg}
    }
  `;

  return (
    // Pass a theme into the app for styled components to use.
    <ThemeProvider theme={makeThemeForFont("Gill Sans", theme || lightTheme)}>
      <GlobalStyle />
      <LobbyContext.Provider
        value={{
          author,
          setAuthor,
          statusBarHeight,
          setStatusBarHeight,
          appStateDispatch: dispatch,
        }}
      >
        <StorageContext.Provider
          value={{ pubs, workspaces, setPubs, setWorkspaces }}
        >
          <div
            css={css`
      font: ${(props) =>
        `${props.theme.font.size}px ${props.theme.font.family}`};}
        color: ${(props) => props.theme.colours.fg};
        background: ${(props) => props.theme.colours.bg}
      `}
          >
            {appState.screen === "DASHBOARD" ? (
              <Dashboard relayEnv={env} />
            ) : null}
            {appState.screen === "WORKSPACE" ? (
              <WorkspaceViewer
                workspaceAddress={appState.address}
                relayEnv={env}
              />
            ) : null}
          </div>
        </StorageContext.Provider>
      </LobbyContext.Provider>
    </ThemeProvider>
  );
};

export default App;
