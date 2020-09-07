import React, { useState, useCallback, useContext, useReducer } from "react";
import { css } from "styled-components/macro";

import MaxWidth from "./MaxWidth";
import { LobbyContext } from "./util/lobby-context";
import { usePrevious } from "./util/hooks";

type StatusBarProps = {
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
};

export const StatusBarContext = React.createContext<{
  setPanelState: React.Dispatch<StatusBarPanelAction>;
  panelState: StatusBarPanelState;
  isOn: "LEFT" | "RIGHT";
  panelNode: HTMLDivElement;
}>({
  setPanelState: () => {},
  panelState: "NONE",
  isOn: "LEFT",
  panelNode: document.createElement("div"),
});

type StatusBarPanelState = "LEFT" | "RIGHT" | "NONE";

export type StatusBarPanelAction = "LEFT" | "RIGHT" | "NONE";

function statusBarPanelReducer(
  state: StatusBarPanelState,
  action: StatusBarPanelAction
): StatusBarPanelState {
  switch (action) {
    case "LEFT":
      return state === "LEFT" ? "NONE" : "LEFT";
    case "RIGHT":
      return state === "RIGHT" ? "NONE" : "RIGHT";
    case "NONE":
      return "NONE";
    default:
      return state;
  }
}

const StatusBar: React.FC<StatusBarProps> = ({
  leftChildren,
  rightChildren,
}) => {
  const { setStatusBarHeight } = useContext(LobbyContext);

  const [panelState, dispatch] = useReducer(
    statusBarPanelReducer,
    "NONE" as StatusBarPanelState
  );

  // Using these to make the contextual panel's arrow point to the right place
  const [lCtxNode, setLCtxNode] = useState<HTMLDivElement | null>(null);
  const [rCtxNode, setRCtxNode] = useState<HTMLDivElement | null>(null);

  const prevPanelState = usePrevious(panelState);

  // Here for a good sticky effect
  const measuredRef = useCallback(
    (node) => {
      if (node !== null && prevPanelState !== panelState) {
        setStatusBarHeight(node.getBoundingClientRect().height);
      }
    },
    [prevPanelState, panelState, setStatusBarHeight]
  );

  return (
    <div
      css={css`
        position: sticky;
        z-index: 1;
        top: 0;
        background: ${(props) => props.theme.colours.bg};
        border-bottom: 1px solid ${(props) => props.theme.colours.bgHint};
        box-shadow: 2px 2px 4px 4px rgba(0, 0, 0, 0.04);
      `}
      ref={measuredRef}
    >
      <div
        css={css`
          display: ${panelState === "LEFT" ? "auto" : "none"};
        `}
        ref={(inst) => {
          if (inst) {
            setLCtxNode(inst);
          }
        }}
      ></div>
      <div
        css={css`
          display: ${panelState === "RIGHT" ? "auto" : "none"};
        `}
        ref={(inst) => {
          if (inst) {
            setRCtxNode(inst);
          }
        }}
      ></div>
      <MaxWidth>
        <div
          css={`
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            align-items: baseline;
          `}
        >
          {React.isValidElement(leftChildren) && lCtxNode ? (
            <StatusBarContext.Provider
              value={{
                setPanelState: dispatch,
                panelState,
                isOn: "LEFT",
                panelNode: lCtxNode,
              }}
            >
              {leftChildren}
            </StatusBarContext.Provider>
          ) : null}
          <div></div>
          {React.isValidElement(rightChildren) && rCtxNode ? (
            <StatusBarContext.Provider
              value={{
                setPanelState: dispatch,
                panelState,
                isOn: "RIGHT",
                panelNode: rCtxNode,
              }}
            >
              {rightChildren}
            </StatusBarContext.Provider>
          ) : null}
        </div>
      </MaxWidth>
    </div>
  );
};

export default StatusBar;
