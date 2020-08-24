import React from "react";
import { AuthorKeypair } from "earthstar";
import { AppAction } from "../App";

export const LobbyContext = React.createContext<{
  author: AuthorKeypair | null;
  setAuthor: (author: AuthorKeypair | null) => void;
  setStatusBarHeight: (height: number) => void;
  statusBarHeight: number;
  appStateDispatch: React.Dispatch<AppAction>;
}>({
  author: null,
  setAuthor: () => {},
  setStatusBarHeight: () => {},
  statusBarHeight: 0,
  appStateDispatch: () => {},
});
