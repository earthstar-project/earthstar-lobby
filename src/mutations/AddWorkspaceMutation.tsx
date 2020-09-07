import { commitMutation, Environment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { PayloadError } from "relay-runtime";
import {
  AddWorkspaceMutation,
  AddWorkspaceMutationVariables,
  AddWorkspaceMutationResponse,
} from "./__generated__/AddWorkspaceMutation.graphql";

const mutation = graphql`
  mutation AddWorkspaceMutation($workspaceAddress: String!) {
    addWorkspace(workspaceAddress: $workspaceAddress) {
      __typename
      ... on WorkspaceAddedResult {
        workspace {
          address
          ...WorkspaceSummary_workspace
          ...WorkspaceMessages_workspace
        }
      }
      ... on WorkspaceExistsResult {
        workspace {
          address
        }
      }
      ... on NotPermittedResult {
        reason
      }
    }
  }
`;

function commit(
  environment: Environment,
  variables: AddWorkspaceMutationVariables,
  onCompleted?: (
    response: AddWorkspaceMutationResponse,
    errors: readonly PayloadError[] | null | undefined
  ) => void
) {
  return commitMutation<AddWorkspaceMutation>(environment, {
    mutation,
    variables,
    onCompleted,
    updater: (store) => {
      const result = store.getRootField("addWorkspace");

      if (!result) {
        return;
      }

      if (result.getType() !== "WorkspaceAddedResult") {
        return;
      }

      const workspace = result.getLinkedRecord("workspace");

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
