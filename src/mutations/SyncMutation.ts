import { commitMutation, Environment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import {
  SyncMutation,
  SyncMutationVariables,
  SyncMutationResponse,
} from "./__generated__/SyncMutation.graphql";
import { PayloadError } from "relay-runtime";

const mutation = graphql`
  mutation SyncMutation($workspace: String!, $pubUrls: [String!]!) {
    syncWithPubs(workspace: $workspace, pubUrls: $pubUrls) {
      __typename
      ... on SyncReport {
        syncedWorkspace {
          ...WorkspaceSummary_workspace
          ...WorkspaceMessages_workspace
        }
        pubSyncResults {
          __typename
          ... on PubSyncDetails {
            pubUrl
          }
          ... on SyncSuccess {
            __typename
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
          }
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
      const result = store.getRootField("syncWithPubs");

      if (!result || result.getType() !== "SyncReport") {
        return;
      }

      const workspace = result.getLinkedRecord("syncedWorkspace");

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
