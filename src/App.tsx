import React, { useReducer } from "react";

import { ThemeProvider, css, createGlobalStyle } from "styled-components/macro";

import { lightTheme, makeThemeForFont, darkTheme } from "./themes";
import { useModeSelector } from "use-light-switch";
import WorkspaceViewer from "./WorkspaceViewer";
import { LobbyContext } from "./util/lobby-context";
import Dashboard from "./Dashboard";
import useInternetTime from "use-internet-time";
import {
  EarthstarPeer,
  Earthbar,
  useLocalStorageEarthstarSettings,
  LocalStorageSettingsWriter,
  MultiWorkspaceTab,
  AuthorTab,
  Spacer,
  useCurrentAuthor,
  useAddWorkspace,
  useWorkspaces,
  usePubs,
} from "react-earthstar";
import "react-earthstar/styles/layout.css";
import "react-earthstar/styles/junior.css";
import MaxWidth from "./MaxWidth";
import {
  usePersistedAuthor,
  useWorkspacesFromStorage,
  usePubsFromStorage,
} from "./util/hooks";
import { deleteFromStorage } from "@rehooks/local-storage";
import NavButton from "./NavButton";
import { WindupChildren } from "windups";
import Button from "./Button";

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

  const GlobalStyle = createGlobalStyle`
    html, body {
      background: ${(props) => props.theme.colours.bg}
    }
  `;

  const initValues = useLocalStorageEarthstarSettings("lobby");

  return (
    // Pass a theme into the app for styled components to use.
    <ThemeProvider theme={makeThemeForFont("Gill Sans", theme || lightTheme)}>
      <GlobalStyle />
      <EarthstarPeer {...initValues}>
        <WorkspaceMigrator />
        <MaxWidth
          css={`
            margin-top: 8px;
          `}
        >
          <Earthbar>
            {appState.screen === "WORKSPACE" ? (
              <Button
                css={`
                  align-self: baseline;
                `}
                onClick={() => dispatch({ type: "OPEN_DASHBOARD" })}
              >
                {"← Back"}
              </Button>
            ) : null}

            <MultiWorkspaceTab />
            <Spacer />
            <AuthorTab />
            <InternetClock />
          </Earthbar>
        </MaxWidth>
        <LocalStorageSettingsWriter storageKey={"lobby"} />
        <LobbyContext.Provider
          value={{
            appStateDispatch: dispatch,
          }}
        >
          <div
            css={css`
      font: ${(props) =>
        `${props.theme.font.size}px ${props.theme.font.family}`};}
        color: ${(props) => props.theme.colours.fg};
        background: ${(props) => props.theme.colours.bg}
      `}
          >
            {appState.screen === "DASHBOARD" ? <Dashboard /> : null}
            {appState.screen === "WORKSPACE" ? (
              <WorkspaceViewer workspaceAddress={appState.address} />
            ) : null}
          </div>
        </LobbyContext.Provider>
      </EarthstarPeer>
    </ThemeProvider>
  );
};

export default App;

function WorkspaceMigrator() {
  const oldCurrentAuthor = usePersistedAuthor();
  const oldWorkspaces = useWorkspacesFromStorage();
  const oldPubs = usePubsFromStorage();

  const [currentAuthor, setCurrentAuthor] = useCurrentAuthor();

  const workspaces = useWorkspaces();
  const addWorkspace = useAddWorkspace();

  const [pubs, setPubs] = usePubs();

  React.useEffect(() => {
    if (oldCurrentAuthor && currentAuthor === null) {
      setCurrentAuthor(oldCurrentAuthor);
      deleteFromStorage("authorKeypair");
    }
  }, [oldCurrentAuthor, currentAuthor, setCurrentAuthor]);

  React.useEffect(() => {
    if (oldWorkspaces) {
      oldWorkspaces.forEach((ws) => {
        if (!workspaces.includes(ws)) {
          addWorkspace(ws);
        }
      });
      deleteFromStorage("workspaces");
    }
  }, [oldWorkspaces, workspaces, addWorkspace]);

  React.useEffect(() => {
    if (oldPubs) {
      const nextPubs = Object.entries(oldPubs).reduce((acc, [ws, wsPubs]) => {
        const current = pubs[ws] || [];

        const next = [
          ...wsPubs.filter(
            (url) => url !== "https://earthstar-graphql-pub.glitch.me"
          ),
          ...current,
        ];

        return { ...acc, [ws]: next };
      }, {} as Record<string, string[]>);

      setPubs(nextPubs);

      deleteFromStorage("pubs");
    }
  }, [oldPubs, pubs, setPubs]);

  return null;
}

function InternetClock() {
  const time = useInternetTime({ fractional: true });

  return (
    <div
      css={css`
        font-feature-settings: "tnum";
        font-variant-numeric: tabular-nums;
        color: "var(--gr3)";
        align-self: center;
      `}
    >
      {time}
    </div>
  );
}
