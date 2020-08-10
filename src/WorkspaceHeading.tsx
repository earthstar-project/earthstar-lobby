import React, { useState } from "react";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { WorkspaceHeading_workspace } from "./__generated__/WorkspaceHeading_workspace.graphql";
import { PUB_URL } from "./App";
import SyncMutation from "./mutations/SyncMutation";

type WorkspaceHeadingProps = {
  workspace: WorkspaceHeading_workspace;
  hasLocalWorkspaceChanges: boolean;
  setHasLocalWorkspaceChanges: (hasChanges: boolean) => void;
  relay: RelayProp;
};

const WorkspaceHeading: React.FC<WorkspaceHeadingProps> = ({
  workspace,
  hasLocalWorkspaceChanges,
  setHasLocalWorkspaceChanges,
  relay,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>{workspace.name}</h1>
      {hasLocalWorkspaceChanges && window.navigator.onLine ? (
        <button
          disabled={isSyncing}
          onClick={() => {
            setIsSyncing(true);
            SyncMutation.commit(
              relay.environment,
              {
                pubUrl: PUB_URL,
                workspace: workspace.address,
                format: "GRAPHQL",
              },
              () => {
                console.log("Sync Complete ✅");
                setHasLocalWorkspaceChanges(false);
                setIsSyncing(false);
              }
            );
          }}
        >
          {isSyncing ? "Syncing..." : "Sync"}
        </button>
      ) : null}
    </div>
  );
};

export default createFragmentContainer(WorkspaceHeading, {
  workspace: graphql`
    fragment WorkspaceHeading_workspace on Workspace {
      address
      name
    }
  `,
});
