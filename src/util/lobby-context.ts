import React from "react";
import { AuthorKeypair } from "earthstar";

export const LobbyContext = React.createContext<{
  author: AuthorKeypair | null;
  setAuthor: (author: AuthorKeypair | null) => void;
  setStatusBarHeight: (height: number) => void;
  statusBarHeight: number;
}>({
  author: null,
  setAuthor: () => {},
  setStatusBarHeight: () => {},
  statusBarHeight: 0,
});
