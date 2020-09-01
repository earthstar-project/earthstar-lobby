import React, { useState, useRef, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { css } from "styled-components/macro";
import { WindupChildren } from "windups";

import { PUB_URL } from "./constants";

import Button from "./Button";
import NavButton from "./NavButton";
import { WorkspaceViewerContext } from "./WorkspaceViewer";
import { StatusBarContext } from "./NewStatusBar";
import ContextualPanel from "./ContextualPanel";
import SyncMutation from "./mutations/SyncMutation";
import { LobbyContext } from "./util/lobby-context";

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

  const workspaceNameRef = useRef(null);

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

  return (
    <>
      {createPortal(
        <ContextualPanel accentColour={"alpha"}>
          <>
            <Button
              onClick={() => {
                setIsSyncing(true);
                SyncMutation.commit(
                  relay.environment,
                  {
                    pubUrl: PUB_URL,
                    workspace: workspace.address,
                  },
                  (res) => {
                    console.log("Sync Complete ✅");
                    setIsWorkspaceDirty(false);
                    setIsSyncing(false);

                    if (res.syncWithPub.__typename !== "DetailedSyncSuccess") {
                      return;
                    }

                    if (
                      res.syncWithPub.pulled.acceptedCount === 0 &&
                      res.syncWithPub.pushed.acceptedCount === 0
                    ) {
                      setTempMessage("No updates.");
                      return;
                    }

                    if (res.syncWithPub.pulled.acceptedCount === 0) {
                      setTempMessage(
                        `Pushed ${res.syncWithPub.pushed.acceptedCount} update${
                          res.syncWithPub.pushed.acceptedCount > 1 ? "s" : ""
                        }.`
                      );
                      return;
                    }

                    if (res.syncWithPub.pushed.acceptedCount === 0) {
                      setTempMessage(
                        `Pulled ${res.syncWithPub.pulled.acceptedCount} update${
                          res.syncWithPub.pulled.acceptedCount > 1 ? "s" : ""
                        }.`
                      );
                      return;
                    }

                    setTempMessage(
                      `Downloaded ${res.syncWithPub.pulled.acceptedCount}, uploaded ${res.syncWithPub.pushed.acceptedCount} posts.`
                    );
                  }
                );
              }}
            >
              Sync this workspace
            </Button>
            {" or "}
            <Button
              onClick={() => appStateDispatch({ type: "OPEN_DASHBOARD" })}
            >
              View another one
            </Button>
          </>
        </ContextualPanel>,
        panelNode
      )}
      <div ref={workspaceNameRef}>
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
