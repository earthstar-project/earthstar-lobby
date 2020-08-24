import React, { useState, useEffect, useMemo, useReducer } from "react";
import createEnvironment from "./util/relay-environment";
import { createSchemaContext } from "earthstar-graphql";
import { AuthorKeypair } from "earthstar";
import { ThemeProvider } from "styled-components/macro";
import { isKeypair } from "./util/handy";
import { lightTheme, makeThemeForFont, darkTheme } from "./themes";
import { WORKSPACE_ADDR } from "./constants";
import { useModeSelector } from "use-light-switch";
import WorkspaceViewer from "./WorkspaceViewer";
import { LobbyContext } from "./util/lobby-context";

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
    screen: "WORKSPACE",
    address: WORKSPACE_ADDR,
  });

  // This is a Relay environment, which is where Relay stores its data cache
  // and configurations for how to fetch data
  const [env] = useState(
    createEnvironment(
      createSchemaContext("MEMORY", {
        workspaceAddresses: [WORKSPACE_ADDR],
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

  // Using this to make the sticky header effects work well
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  return (
    // Pass a theme into the app for styled components to use.
    <ThemeProvider theme={makeThemeForFont("Gill Sans", theme || lightTheme)}>
      <LobbyContext.Provider
        value={{
          author,
          setAuthor,
          statusBarHeight,
          setStatusBarHeight,
          appStateDispatch: dispatch,
        }}
      >
        {appState.screen === "WORKSPACE" ? (
          <WorkspaceViewer workspaceAddress={appState.address} relayEnv={env} />
        ) : null}
      </LobbyContext.Provider>
    </ThemeProvider>
  );
};

export default App;
