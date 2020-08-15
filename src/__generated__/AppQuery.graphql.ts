/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AppQueryVariables = {
    workspace: string;
    authorAddress: string;
};
export type AppQueryResponse = {
    readonly workspace: {
        readonly " $fragmentRefs": FragmentRefs<"StatusBar_workspace" | "WorkspaceMessages_workspace" | "MessageComposer_workspace">;
    } | null;
};
export type AppQuery = {
    readonly response: AppQueryResponse;
    readonly variables: AppQueryVariables;
};



/*
query AppQuery(
  $workspace: String!
  $authorAddress: String!
) {
  workspace(address: $workspace) {
    ...StatusBar_workspace_3XuIvM
    ...WorkspaceMessages_workspace
    ...MessageComposer_workspace
    id
  }
}

fragment MessageComposer_workspace on Workspace {
  address
}

fragment MessageEditor_document on ES4Document {
  content
}

fragment Message_document on Document {
  __isDocument: __typename
  __typename
  ... on ES4Document {
    ...MessageEditor_document
    id
    content
    path
    timestamp
    workspace {
      address
      id
    }
    author {
      address
      displayName
      shortName
      id
    }
  }
}

fragment StatusBar_workspace_3XuIvM on Workspace {
  address
  name
  author(address: $authorAddress) {
    displayName
    id
  }
}

fragment WorkspaceMessages_workspace on Workspace {
  address
  documents(sortedBy: NEWEST, pathPrefixes: ["/lobby"]) {
    __typename
    ...Message_document
    ... on ES4Document {
      id
      timestamp
    }
    ... on Node {
      __isNode: __typename
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "authorAddress"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "workspace"
},
v2 = [
  {
    "kind": "Variable",
    "name": "address",
    "variableName": "workspace"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Workspace",
        "kind": "LinkedField",
        "name": "workspace",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "authorAddress",
                "variableName": "authorAddress"
              }
            ],
            "kind": "FragmentSpread",
            "name": "StatusBar_workspace"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WorkspaceMessages_workspace"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MessageComposer_workspace"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Workspace",
        "kind": "LinkedField",
        "name": "workspace",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "address",
                "variableName": "authorAddress"
              }
            ],
            "concreteType": "Author",
            "kind": "LinkedField",
            "name": "author",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "pathPrefixes",
                "value": [
                  "/lobby"
                ]
              },
              {
                "kind": "Literal",
                "name": "sortedBy",
                "value": "NEWEST"
              }
            ],
            "concreteType": null,
            "kind": "LinkedField",
            "name": "documents",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isDocument"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "content",
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "path",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "timestamp",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Workspace",
                    "kind": "LinkedField",
                    "name": "workspace",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Author",
                    "kind": "LinkedField",
                    "name": "author",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "shortName",
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "ES4Document",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
              }
            ],
            "storageKey": "documents(pathPrefixes:[\"/lobby\"],sortedBy:\"NEWEST\")"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2968c31d5635544637e4d9231284f859",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery(\n  $workspace: String!\n  $authorAddress: String!\n) {\n  workspace(address: $workspace) {\n    ...StatusBar_workspace_3XuIvM\n    ...WorkspaceMessages_workspace\n    ...MessageComposer_workspace\n    id\n  }\n}\n\nfragment MessageComposer_workspace on Workspace {\n  address\n}\n\nfragment MessageEditor_document on ES4Document {\n  content\n}\n\nfragment Message_document on Document {\n  __isDocument: __typename\n  __typename\n  ... on ES4Document {\n    ...MessageEditor_document\n    id\n    content\n    path\n    timestamp\n    workspace {\n      address\n      id\n    }\n    author {\n      address\n      displayName\n      shortName\n      id\n    }\n  }\n}\n\nfragment StatusBar_workspace_3XuIvM on Workspace {\n  address\n  name\n  author(address: $authorAddress) {\n    displayName\n    id\n  }\n}\n\nfragment WorkspaceMessages_workspace on Workspace {\n  address\n  documents(sortedBy: NEWEST, pathPrefixes: [\"/lobby\"]) {\n    __typename\n    ...Message_document\n    ... on ES4Document {\n      id\n      timestamp\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e33f202f111e6a8d08e3ea33c636ba2f';
export default node;
