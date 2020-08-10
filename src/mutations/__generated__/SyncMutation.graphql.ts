/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SyncFormatEnum = "GRAPHQL" | "REST" | "%future added value";
export type SyncMutationVariables = {
    workspace: string;
    pubUrl: string;
    format: SyncFormatEnum;
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
  $format: SyncFormatEnum!
) {
  syncWithPub(workspace: $workspace, pubUrl: $pubUrl, format: $format) {
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
    workspace {
      address
      id
    }
    author {
      address
      shortName
      id
    }
  }
}

fragment WorkspaceMessages_workspace on Workspace {
  address
  documents(sortedBy: NEWEST) {
    __typename
    ...Message_document
    ... on ES4Document {
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
  "name": "format"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pubUrl"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "workspace"
},
v3 = [
  {
    "kind": "Variable",
    "name": "format",
    "variableName": "format"
  },
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
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
v6 = {
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
v7 = [
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
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "DocumentIngestionReport",
  "kind": "LinkedField",
  "name": "pushed",
  "plural": false,
  "selections": (v7/*: any*/),
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "DocumentIngestionReport",
  "kind": "LinkedField",
  "name": "pulled",
  "plural": false,
  "selections": (v7/*: any*/),
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "Workspace",
  "kind": "LinkedField",
  "name": "syncedWorkspace",
  "plural": false,
  "selections": [
    (v10/*: any*/),
    {
      "alias": null,
      "args": [
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
        (v4/*: any*/),
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
            (v11/*: any*/),
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
                (v10/*: any*/),
                (v11/*: any*/)
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
                (v10/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "shortName",
                  "storageKey": null
                },
                (v11/*: any*/)
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
            (v11/*: any*/)
          ],
          "type": "Node",
          "abstractKey": "__isNode"
        }
      ],
      "storageKey": "documents(sortedBy:\"NEWEST\")"
    },
    (v11/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SyncMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "syncWithPub",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v6/*: any*/)
            ],
            "type": "SyncSuccess",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v8/*: any*/),
              (v9/*: any*/),
              (v6/*: any*/)
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
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SyncMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "syncWithPub",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v12/*: any*/)
            ],
            "type": "SyncSuccess",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v8/*: any*/),
              (v9/*: any*/),
              (v12/*: any*/)
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
    "cacheID": "64c77e59f957ff4d62b5e9857408a29c",
    "id": null,
    "metadata": {},
    "name": "SyncMutation",
    "operationKind": "mutation",
    "text": "mutation SyncMutation(\n  $workspace: String!\n  $pubUrl: String!\n  $format: SyncFormatEnum!\n) {\n  syncWithPub(workspace: $workspace, pubUrl: $pubUrl, format: $format) {\n    __typename\n    ... on SyncError {\n      reason\n    }\n    ... on SyncSuccess {\n      syncedWorkspace {\n        ...WorkspaceMessages_workspace\n        id\n      }\n    }\n    ... on DetailedSyncSuccess {\n      pushed {\n        rejectedCount\n        ignoredCount\n        acceptedCount\n      }\n      pulled {\n        rejectedCount\n        ignoredCount\n        acceptedCount\n      }\n      syncedWorkspace {\n        ...WorkspaceMessages_workspace\n        id\n      }\n    }\n  }\n}\n\nfragment MessageEditor_document on ES4Document {\n  content\n}\n\nfragment Message_document on Document {\n  __isDocument: __typename\n  __typename\n  ... on ES4Document {\n    ...MessageEditor_document\n    id\n    content\n    path\n    timestamp\n    workspace {\n      address\n      id\n    }\n    author {\n      address\n      shortName\n      id\n    }\n  }\n}\n\nfragment WorkspaceMessages_workspace on Workspace {\n  address\n  documents(sortedBy: NEWEST) {\n    __typename\n    ...Message_document\n    ... on ES4Document {\n      timestamp\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '90f43c4a595563c71089be1448d92ee9';
export default node;
