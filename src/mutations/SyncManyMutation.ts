import { commitMutation, Environment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import {
  SyncManyMutation,
  SyncManyMutationVariables,
  SyncManyMutationResponse,
} from "./__generated__/SyncManyMutation.graphql";
import { PayloadError } from "relay-runtime";

const mutation = graphql`
  mutation SyncManyMutation($workspaces: [SyncInput!]!) {
    syncMany(workspaces: $workspaces) {
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
          ...WorkspaceMessages_workspace
          ...WorkspaceSummary_workspace
        }
      }
    }
  }
`;

function commit(
  environment: Environment,
  variables: SyncManyMutationVariables,
  onCompleted?: (
    response: SyncManyMutationResponse,
    errors: readonly PayloadError[] | null | undefined
  ) => void
) {
  return commitMutation<SyncManyMutation>(environment, {
    mutation,
    variables,
    onCompleted,
    updater: (store) => {
      const results = store.getPluralRootField("syncMany");

      if (!results) {
        return;
      }

      const workspaces = results.map((res) => {
        if (!res) {
          return null;
        }

        const resType = res.getType();

        if (resType === "DetailedSyncSuccess" || resType === "SyncSuccess") {
          return res.getLinkedRecord("syncedWorkspace");
        }

        return null;
      });

      const prevWorkspaces = store.getRoot().getLinkedRecords("workspaces");

      if (!prevWorkspaces) {
        store.getRoot().setLinkedRecords(workspaces, "workspaces");
        return;
      }

      const next = Array.from(new Set([...prevWorkspaces, ...workspaces]));

      store.getRoot().setLinkedRecords(next, "workspaces");
    },
  });
}

export default { commit };
