/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
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
            readonly id: string;
            readonly documents: ReadonlyArray<{
                readonly id?: string;
                readonly content?: string;
                readonly timestamp?: number;
                readonly author?: {
                    readonly shortName: string;
                    readonly address: string;
                };
            }>;
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
          __typename
          ... on ES4Document {
            id
            content
            timestamp
            author {
              shortName
              address
              id
            }
          }
          ... on Node {
            __isNode: __typename
            id
          }
        }
      }
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
  "name": "id",
  "storageKey": null
},
v10 = [
  {
    "kind": "Literal",
    "name": "sortedBy",
    "value": "NEWEST"
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timestamp",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shortName",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
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
              (v7/*: any*/),
              (v8/*: any*/),
              {
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
                    "args": (v10/*: any*/),
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "documents",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v9/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Author",
                            "kind": "LinkedField",
                            "name": "author",
                            "plural": false,
                            "selections": [
                              (v13/*: any*/),
                              (v14/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "ES4Document",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": "documents(sortedBy:\"NEWEST\")"
                  }
                ],
                "storageKey": null
              }
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
              (v7/*: any*/),
              (v8/*: any*/),
              {
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
                    "args": (v10/*: any*/),
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "documents",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v9/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Author",
                            "kind": "LinkedField",
                            "name": "author",
                            "plural": false,
                            "selections": [
                              (v13/*: any*/),
                              (v14/*: any*/),
                              (v9/*: any*/)
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
                          (v9/*: any*/)
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": "documents(sortedBy:\"NEWEST\")"
                  }
                ],
                "storageKey": null
              }
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
    "cacheID": "9b09e3fbf7ce6e878c74f81521c5cb56",
    "id": null,
    "metadata": {},
    "name": "SyncMutation",
    "operationKind": "mutation",
    "text": "mutation SyncMutation(\n  $workspace: String!\n  $pubUrl: String!\n  $format: SyncFormatEnum!\n) {\n  syncWithPub(workspace: $workspace, pubUrl: $pubUrl, format: $format) {\n    __typename\n    ... on SyncError {\n      reason\n    }\n    ... on DetailedSyncSuccess {\n      pushed {\n        rejectedCount\n        ignoredCount\n        acceptedCount\n      }\n      pulled {\n        rejectedCount\n        ignoredCount\n        acceptedCount\n      }\n      syncedWorkspace {\n        id\n        documents(sortedBy: NEWEST) {\n          __typename\n          ... on ES4Document {\n            id\n            content\n            timestamp\n            author {\n              shortName\n              address\n              id\n            }\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a39148d0f11aceec3dd429d459f1bd21';
export default node;
