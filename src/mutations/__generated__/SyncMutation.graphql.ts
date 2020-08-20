/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SyncMutationVariables = {
    workspace: string;
    pubUrl: string;
};
export type SyncMutationResponse = {
    readonly syncWithPub: {
        readonly __typename: "SyncError";
        readonly reason: string;
    } | {
        readonly __typename: "SyncSuccess";
        readonly syncedWorkspace: {
            readonly " $fragmentRefs": FragmentRefs<"WorkspaceMessages_workspace">;
        };
    } | {
        readonly __typename: "DetailedSyncSuccess";
        readonly pushed: {
            readonly rejectedCount: number;
            readonly ignoredCount: number;
            readonly acceptedCount: number;
        };
        readonly pulled: {
            readonly rejectedCount: number;
            readonly ignoredCount: number;
            readonly acceptedCount: number;
        };
        readonly syncedWorkspace: {
            readonly " $fragmentRefs": FragmentRefs<"WorkspaceMessages_workspace">;
        };
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    };
};
export type SyncMutation = {
    readonly response: SyncMutationResponse;
    readonly variables: SyncMutationVariables;
};



/*
mutation SyncMutation(
  $workspace: String!
  $pubUrl: String!
) {
  syncWithPub(workspace: $workspace, pubUrl: $pubUrl) {
    __typename
    ... on SyncError {
      reason
    }
    ... on SyncSuccess {
      syncedWorkspace {
        ...WorkspaceMessages_workspace
        id
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
        id
      }
    }
  }
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
    deleteAfter
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
  "name": "pubUrl"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "workspace"
},
v2 = [
  {
    "kind": "Variable",
    "name": "pubUrl",
    "variableName": "pubUrl"
  },
  {
    "kind": "Variable",
    "name": "workspace",
    "variableName": "workspace"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reason",
      "storageKey": null
    }
  ],
  "type": "SyncError",
  "abstractKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Workspace",
  "kind": "LinkedField",
  "name": "syncedWorkspace",
  "plural": false,
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "WorkspaceMessages_workspace"
    }
  ],
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "rejectedCount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "ignoredCount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "acceptedCount",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "DocumentIngestionReport",
  "kind": "LinkedField",
  "name": "pushed",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "DocumentIngestionReport",
  "kind": "LinkedField",
  "name": "pulled",
  "plural": false,
  "selections": (v6/*: any*/),
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Workspace",
  "kind": "LinkedField",
  "name": "syncedWorkspace",
  "plural": false,
  "selections": [
    (v9/*: any*/),
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
        (v3/*: any*/),
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
            (v10/*: any*/),
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
              "kind": "ScalarField",
              "name": "deleteAfter",
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
                (v9/*: any*/),
                (v10/*: any*/)
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
                (v9/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "displayName",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "shortName",
                  "storageKey": null
                },
                (v10/*: any*/)
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
            (v10/*: any*/)
          ],
          "type": "Node",
          "abstractKey": "__isNode"
        }
      ],
      "storageKey": "documents(pathPrefixes:[\"/lobby\"],sortedBy:\"NEWEST\")"
    },
    (v10/*: any*/)
  ],
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
    "name": "SyncMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "syncWithPub",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v5/*: any*/)
            ],
            "type": "SyncSuccess",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v7/*: any*/),
              (v8/*: any*/),
              (v5/*: any*/)
            ],
            "type": "DetailedSyncSuccess",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SyncMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "syncWithPub",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v11/*: any*/)
            ],
            "type": "SyncSuccess",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v7/*: any*/),
              (v8/*: any*/),
              (v11/*: any*/)
            ],
            "type": "DetailedSyncSuccess",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d0c1926ac87f085eb198c855dea6a3ed",
    "id": null,
    "metadata": {},
    "name": "SyncMutation",
    "operationKind": "mutation",
    "text": "mutation SyncMutation(\n  $workspace: String!\n  $pubUrl: String!\n) {\n  syncWithPub(workspace: $workspace, pubUrl: $pubUrl) {\n    __typename\n    ... on SyncError {\n      reason\n    }\n    ... on SyncSuccess {\n      syncedWorkspace {\n        ...WorkspaceMessages_workspace\n        id\n      }\n    }\n    ... on DetailedSyncSuccess {\n      pushed {\n        rejectedCount\n        ignoredCount\n        acceptedCount\n      }\n      pulled {\n        rejectedCount\n        ignoredCount\n        acceptedCount\n      }\n      syncedWorkspace {\n        ...WorkspaceMessages_workspace\n        id\n      }\n    }\n  }\n}\n\nfragment MessageEditor_document on ES4Document {\n  content\n}\n\nfragment Message_document on Document {\n  __isDocument: __typename\n  __typename\n  ... on ES4Document {\n    ...MessageEditor_document\n    id\n    content\n    path\n    timestamp\n    deleteAfter\n    workspace {\n      address\n      id\n    }\n    author {\n      address\n      displayName\n      shortName\n      id\n    }\n  }\n}\n\nfragment WorkspaceMessages_workspace on Workspace {\n  address\n  documents(sortedBy: NEWEST, pathPrefixes: [\"/lobby\"]) {\n    __typename\n    ...Message_document\n    ... on ES4Document {\n      id\n      timestamp\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '146eaea39a1cfd9ed944834fab8f3d6e';
export default node;
