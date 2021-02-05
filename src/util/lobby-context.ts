import React from "react";
import { AppAction } from "../App";

export const LobbyContext = React.createContext<{
  appStateDispatch: React.Dispatch<AppAction>;
}>({
  appStateDispatch: () => {},
});
