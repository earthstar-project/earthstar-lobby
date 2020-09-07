import { commitMutation, Environment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import {
  SyncMutation,
  SyncMutationVariables,
  SyncMutationResponse,
} from "./__generated__/SyncMutation.graphql";
import { PayloadError } from "relay-runtime";

const mutation = graphql`
  mutation SyncMutation($workspace: String!, $pubUrl: String!) {
    syncWithPub(workspace: $workspace, pubUrl: $pubUrl) {
      __typename
      ... on SyncError {
        reason
      }
      ... on SyncSuccess {
        syncedWorkspace {
          ...WorkspaceSummary_workspace
          ...WorkspaceMessages_workspace
        }
      }
      ... on DetailedSyncSuccess {
        pushed {
          rejectedCount
          ignoredCount
          acceptedCount
        }
        pulled {
          rejectedCount
          ignoredCount
          acceptedCount
        }
        syncedWorkspace {
          ...WorkspaceSummary_workspace
          ...WorkspaceMessages_workspace
        }
      }
    }
  }
`;

function commit(
  environment: Environment,
  variables: SyncMutationVariables,
  onCompleted?: (
    response: SyncMutationResponse,
    errors: readonly PayloadError[] | null | undefined
  ) => void
) {
  return commitMutation<SyncMutation>(environment, {
    mutation,
    variables,
    onCompleted,
    updater: (store) => {
      const result = store.getRootField("syncWithPub");

      if (!result) {
        return;
      }

      const workspace =
        result.getType() === "DetailedSyncSuccess" || "SyncSuccess"
          ? result.getLinkedRecord("syncedWorkspace")
          : null;

      const prevWorkspaces = store.getRoot().getLinkedRecords("workspaces");

      if (!prevWorkspaces) {
        store.getRoot().setLinkedRecords([workspace], "workspaces");
        return;
      }

      const next = Array.from(new Set([...prevWorkspaces, workspace]));

      store.getRoot().setLinkedRecords(next, "workspaces");
    },
  });
}

export default { commit };
