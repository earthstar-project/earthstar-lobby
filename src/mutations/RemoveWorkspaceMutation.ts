import { commitMutation, Environment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { PayloadError } from "relay-runtime";
import {
  RemoveWorkspaceMutation,
  RemoveWorkspaceMutationResponse,
  RemoveWorkspaceMutationVariables,
} from "./__generated__/RemoveWorkspaceMutation.graphql";

const mutation = graphql`
  mutation RemoveWorkspaceMutation($workspaceAddress: String!) {
    removeWorkspace(workspaceAddress: $workspaceAddress) {
      __typename
      ... on WorkspaceRemovedResult {
        address
      }
    }
  }
`;

function commit(
  environment: Environment,
  variables: RemoveWorkspaceMutationVariables,
  onCompleted?: (
    response: RemoveWorkspaceMutationResponse,
    errors: readonly PayloadError[] | null | undefined
  ) => void
) {
  return commitMutation<RemoveWorkspaceMutation>(environment, {
    mutation,
    variables,
    onCompleted,
    updater: (store) => {
      const result = store.getRootField("removeWorkspace");

      if (!result) {
        return;
      }

      if (result.getType() !== "WorkspaceRemovedResult") {
        return;
      }

      const removedAddress = result.getValue("address");

      const prevWorkspaces = store.getRoot().getLinkedRecords("workspaces");

      if (!prevWorkspaces) {
        return;
      }

      const next = prevWorkspaces.filter(
        (workspace) => workspace.getValue("address") !== removedAddress
      );

      store.getRoot().setLinkedRecords(next, "workspaces");
    },
  });
}

export default { commit };
