import { commitMutation, Environment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import {
  SetMutation,
  AuthorInput,
  NewDocumentInput,
  SetMutationResponse,
} from "./__generated__/SetMutation.graphql";
import { PayloadError } from "relay-runtime";

const mutation = graphql`
  mutation SetMutation(
    $author: AuthorInput!
    $document: NewDocumentInput!
    $workspace: String!
  ) {
    set(author: $author, document: $document, workspace: $workspace) {
      __typename
      ... on DocumentRejectedError {
        reason
      }
      ... on SetDataSuccessResult {
        document {
          ...Message_document
          ... on ES4Document {
            id
            workspace {
              ...WorkspaceMessages_workspace
            }
          }
        }
      }
    }
  }
`;

function commit(
  environment: Environment,
  variables: {
    author: AuthorInput;
    document: NewDocumentInput;
    workspace: string;
  },
  onCompleted?: (
    response: SetMutationResponse,
    errors: readonly PayloadError[] | null | undefined
  ) => void
) {
  return commitMutation<SetMutation>(environment, {
    mutation,
    variables,
    onCompleted,
  });
}

export default { commit };
