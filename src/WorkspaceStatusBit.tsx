import React, { useState, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { css } from "styled-components/macro";
import { WindupChildren } from "windups";

import Button from "./Button";
import NavButton from "./NavButton";
import { WorkspaceViewerContext } from "./WorkspaceViewer";
import { StatusBarContext } from "./NewStatusBar";
import ContextualPanel from "./ContextualPanel";
import SyncMutation from "./mutations/SyncMutation";
import { LobbyContext } from "./util/lobby-context";
import { usePubs } from "./util/hooks";

import { WorkspaceStatusBit_workspace } from "./__generated__/WorkspaceStatusBit_workspace.graphql";

type WorkspaceStatusBitProps = {
  relay: RelayProp;
  workspace: WorkspaceStatusBit_workspace;
};

const WorkspaceStatusBit: React.FC<WorkspaceStatusBitProps> = ({
  workspace,
  relay,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [tempMessage, setTempMessage] = useState<string | null>(null);

  const { appStateDispatch } = useContext(LobbyContext);
  const { isWorkspaceDirty, setIsWorkspaceDirty } = useContext(
    WorkspaceViewerContext
  );
  const { setPanelState, isOn, panelNode } = useContext(StatusBarContext);

  const [
    workspaceNameNode,
    setWorkspaceNameNode,
  ] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (tempMessage) {
      const timeout = setTimeout(() => {
        setTempMessage(null);
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [tempMessage]);

  const [pubs] = usePubs();

  return (
    <>
      {createPortal(
        <ContextualPanel
          accentColour={"alpha"}
          pointsToNode={workspaceNameNode}
        >
          <>
            <Button
              onClick={() => appStateDispatch({ type: "OPEN_DASHBOARD" })}
            >
              {"← Return to dashboard"}
            </Button>
            {pubs ? (
              <>
                {" or "}
                <Button
                  onClick={() => {
                    setIsSyncing(true);
                    SyncMutation.commit(
                      relay.environment,
                      {
                        workspace: workspace.address,
                        pubUrls: pubs[workspace.address] || [],
                      },
                      () => {
                        setIsWorkspaceDirty(false);
                        setIsSyncing(false);
                        // TODO: make messages from multi sync result
                        setTempMessage("Synced!");
                      }
                    );
                  }}
                >
                  {"Sync this workspace"}
                </Button>
              </>
            ) : null}
          </>
        </ContextualPanel>,
        panelNode
      )}
      <div ref={(inst) => setWorkspaceNameNode(inst)}>
        <WindupChildren>
          {tempMessage ? (
            <span
              css={css`
                color: ${(props) => props.theme.colours.fg};
              `}
            >
              {tempMessage}
            </span>
          ) : (
            <NavButton onClick={() => setPanelState(isOn)} accent={"alpha"}>
              {`+${workspace.name}`}
              <span
                css={css`
                  color: ${(props) => props.theme.colours.alphaLine};
                `}
              >
                {isSyncing
                  ? " is syncing..."
                  : isWorkspaceDirty
                  ? " has unsynced changes"
                  : null}
              </span>
            </NavButton>
          )}
        </WindupChildren>
      </div>
    </>
  );
};

export default createFragmentContainer(WorkspaceStatusBit, {
  workspace: graphql`
    fragment WorkspaceStatusBit_workspace on Workspace {
      name
      address
    }
  `,
});
