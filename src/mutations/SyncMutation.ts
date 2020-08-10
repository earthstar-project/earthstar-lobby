import { commitMutation, Environment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import {
  SyncMutation,
  SyncMutationVariables,
  SyncMutationResponse,
} from "./__generated__/SyncMutation.graphql";
import { PayloadError } from "relay-runtime";

const mutation = graphql`
  mutation SyncMutation(
    $workspace: String!
    $pubUrl: String!
    $format: SyncFormatEnum!
  ) {
    syncWithPub(workspace: $workspace, pubUrl: $pubUrl, format: $format) {
      __typename
      ... on SyncError {
        reason
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
          id
          documents(sortedBy: NEWEST) {
            ... on ES4Document {
              id
              content
              timestamp
              author {
                shortName
                address
              }
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
  });
}

export default { commit };
