import { commitMutation, Environment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import {
  SetMutation,
  AuthorInput,
  NewDocumentInput,
} from "./__generated__/SetMutation.graphql";

const mutation = graphql`
  mutation SetMutation(
    $author: AuthorInput!
    $document: NewDocumentInput!
    $workspace: String!
  ) {
    set(author: $author, document: $document, workspace: $workspace) {
      __typename
      ... on SetDataSuccessResult {
        document {
          ... on ES4Document {
            workspace {
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
    }
  }
`;

function commit(
  environment: Environment,
  variables: {
    author: AuthorInput;
    document: NewDocumentInput;
    workspace: string;
  }
) {
  return commitMutation<SetMutation>(environment, {
    mutation,
    variables,
  });
}

export default { commit };
