/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RemoveWorkspaceMutationVariables = {
    workspaceAddress: string;
};
export type RemoveWorkspaceMutationResponse = {
    readonly removeWorkspace: {
        readonly __typename: "WorkspaceRemovedResult";
        readonly address: string;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    };
};
export type RemoveWorkspaceMutation = {
    readonly response: RemoveWorkspaceMutationResponse;
    readonly variables: RemoveWorkspaceMutationVariables;
};



/*
mutation RemoveWorkspaceMutation(
  $workspaceAddress: String!
) {
  removeWorkspace(workspaceAddress: $workspaceAddress) {
    __typename
    ... on WorkspaceRemovedResult {
      address
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "workspaceAddress"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "workspaceAddress",
        "variableName": "workspaceAddress"
      }
    ],
    "concreteType": null,
    "kind": "LinkedField",
    "name": "removeWorkspace",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "__typename",
        "storageKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "address",
            "storageKey": null
          }
        ],
        "type": "WorkspaceRemovedResult",
        "abstractKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RemoveWorkspaceMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RemoveWorkspaceMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c4caf5b721d0bad956711857892c477b",
    "id": null,
    "metadata": {},
    "name": "RemoveWorkspaceMutation",
    "operationKind": "mutation",
    "text": "mutation RemoveWorkspaceMutation(\n  $workspaceAddress: String!\n) {\n  removeWorkspace(workspaceAddress: $workspaceAddress) {\n    __typename\n    ... on WorkspaceRemovedResult {\n      address\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '781709d70efd5587345bf1bb0a70405e';
export default node;
