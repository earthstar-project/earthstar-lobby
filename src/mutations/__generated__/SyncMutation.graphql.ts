/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SyncMutationVariables = {
    workspace: string;
    pubUrls: Array<string>;
};
export type SyncMutationResponse = {
    readonly syncWithPubs: {
        readonly __typename: "WorkspaceNotValidError";
        readonly reason: string;
    } | {
        readonly __typename: "WorkspaceNotFoundError";
        readonly address: string;
    } | {
        readonly __typename: "SyncReport";
        readonly syncedWorkspace: {
            readonly " $fragmentRefs": FragmentRefs<"WorkspaceSummary_workspace" | "WorkspaceMessages_workspace">;
        };
        readonly pubSyncResults: ReadonlyArray<{
            readonly __typename: string;
            readonly pubUrl?: string;
            readonly reason?: string;
            readonly pushed?: {
                readonly documents: ReadonlyArray<{
                    readonly document?: {
                        readonly id?: string;
                    };
                    readonly __typename: string;
                }>;
                readonly rejectedCount: number;
                readonly ignoredCount: number;
                readonly acceptedCount: number;
            };
            readonly pulled?: {
                readonly documents: ReadonlyArray<{
                    readonly __typename: string;
                    readonly document?: {
                        readonly id?: string;
                    };
                }>;
                readonly rejectedCount: number;
                readonly ignoredCount: number;
                readonly acceptedCount: number;
            };
        }>;
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
  $pubUrls: [String!]!
) {
  syncWithPubs(workspace: $workspace, pubUrls: $pubUrls) {
    __typename
    ... on WorkspaceNotValidError {
      reason
    }
    ... on WorkspaceNotFoundError {
      address
    }
    ... on SyncReport {
      syncedWorkspace {
        ...WorkspaceSummary_workspace
        ...WorkspaceMessages_workspace
        id
      }
      pubSyncResults {
        __typename
        ... on PubSyncDetails {
          __isPubSyncDetails: __typename
          pubUrl
        }
        ... on SyncError {
          reason
        }
        ... on SyncSuccess {
          pubUrl
        }
        ... on DetailedSyncSuccess {
          pushed {
            documents {
              ... on DocumentIngestion {
                __isDocumentIngestion: __typename
                document {
                  __typename
                  ... on ES4Document {
                    id
                  }
                  ... on Node {
                    __isNode: __typename
                    id
                  }
                }
              }
              __typename
            }
            rejectedCount
            ignoredCount
            acceptedCount
          }
          pulled {
            documents {
              __typename
              ... on DocumentIngestion {
                __isDocumentIngestion: __typename
                document {
                  __typename
                  ... on ES4Document {
                    id
                  }
                  ... on Node {
                    __isNode: __typename
                    id
                  }
                }
              }
            }
            rejectedCount
            ignoredCount
            acceptedCount
          }
        }
      }
    }
  }
}

fragment MessageEditor_document on ES4Document {
  content
}

fragment Message_document on ES4Document {
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

fragment WorkspaceMessages_workspace on Workspace {
  address
  documents(sortedBy: NEWEST, pathPrefixes: ["/lobby"]) {
    __typename
    ... on ES4Document {
      id
      timestamp
      ...Message_document
    }
    ... on Node {
      __isNode: __typename
      id
    }
  }
}

fragment WorkspaceSummary_workspace on Workspace {
  name
  address
  population
  documents(sortedBy: NEWEST, pathPrefixes: ["/lobby"]) {
    __typename
    ... on ES4Document {
      id
      content
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
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pubUrls"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "workspace"
},
v2 = [
  {
    "kind": "Variable",
    "name": "pubUrls",
    "variableName": "pubUrls"
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
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "reason",
    "storageKey": null
  }
],
v5 = {
  "kind": "InlineFragment",
  "selections": (v4/*: any*/),
  "type": "WorkspaceNotValidError",
  "abstractKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v7 = {
  "kind": "InlineFragment",
  "selections": [
    (v6/*: any*/)
  ],
  "type": "WorkspaceNotFoundError",
  "abstractKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "pubUrl",
    "storageKey": null
  }
],
v9 = {
  "kind": "InlineFragment",
  "selections": (v8/*: any*/),
  "type": "PubSyncDetails",
  "abstractKey": "__isPubSyncDetails"
},
v10 = {
  "kind": "InlineFragment",
  "selections": (v4/*: any*/),
  "type": "SyncError",
  "abstractKey": null
},
v11 = {
  "kind": "InlineFragment",
  "selections": (v8/*: any*/),
  "type": "SyncSuccess",
  "abstractKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v13 = [
  (v12/*: any*/)
],
v14 = {
  "kind": "InlineFragment",
  "selections": (v13/*: any*/),
  "type": "ES4Document",
  "abstractKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "rejectedCount",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "ignoredCount",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "acceptedCount",
  "storageKey": null
},
v18 = [
  {
    "alias": null,
    "args": null,
    "concreteType": null,
    "kind": "LinkedField",
    "name": "documents",
    "plural": true,
    "selections": [
      (v3/*: any*/),
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "document",
            "plural": false,
            "selections": [
              (v14/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "type": "DocumentIngestion",
        "abstractKey": "__isDocumentIngestion"
      }
    ],
    "storageKey": null
  },
  (v15/*: any*/),
  (v16/*: any*/),
  (v17/*: any*/)
],
v19 = {
  "kind": "InlineFragment",
  "selections": (v13/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v20 = [
  {
    "alias": null,
    "args": null,
    "concreteType": null,
    "kind": "LinkedField",
    "name": "documents",
    "plural": true,
    "selections": [
      (v3/*: any*/),
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "document",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v14/*: any*/),
              (v19/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "type": "DocumentIngestion",
        "abstractKey": "__isDocumentIngestion"
      }
    ],
    "storageKey": null
  },
  (v15/*: any*/),
  (v16/*: any*/),
  (v17/*: any*/)
];
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
        "name": "syncWithPubs",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v5/*: any*/),
          (v7/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
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
                    "name": "WorkspaceSummary_workspace"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "WorkspaceMessages_workspace"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "pubSyncResults",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DocumentIngestionReport",
                        "kind": "LinkedField",
                        "name": "pushed",
                        "plural": false,
                        "selections": (v18/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DocumentIngestionReport",
                        "kind": "LinkedField",
                        "name": "pulled",
                        "plural": false,
                        "selections": (v18/*: any*/),
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
            "type": "SyncReport",
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
        "name": "syncWithPubs",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v5/*: any*/),
          (v7/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Workspace",
                "kind": "LinkedField",
                "name": "syncedWorkspace",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "population",
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
                      (v3/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v12/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "content",
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "shortName",
                                "storageKey": null
                              },
                              (v6/*: any*/),
                              (v12/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "displayName",
                                "storageKey": null
                              }
                            ],
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
                            "name": "path",
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
                              (v6/*: any*/),
                              (v12/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "ES4Document",
                        "abstractKey": null
                      },
                      (v19/*: any*/)
                    ],
                    "storageKey": "documents(pathPrefixes:[\"/lobby\"],sortedBy:\"NEWEST\")"
                  },
                  (v12/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "pubSyncResults",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DocumentIngestionReport",
                        "kind": "LinkedField",
                        "name": "pushed",
                        "plural": false,
                        "selections": (v20/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DocumentIngestionReport",
                        "kind": "LinkedField",
                        "name": "pulled",
                        "plural": false,
                        "selections": (v20/*: any*/),
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
            "type": "SyncReport",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d6fafa02cf9e5bef4563d9a167d695ba",
    "id": null,
    "metadata": {},
    "name": "SyncMutation",
    "operationKind": "mutation",
    "text": "mutation SyncMutation(\n  $workspace: String!\n  $pubUrls: [String!]!\n) {\n  syncWithPubs(workspace: $workspace, pubUrls: $pubUrls) {\n    __typename\n    ... on WorkspaceNotValidError {\n      reason\n    }\n    ... on WorkspaceNotFoundError {\n      address\n    }\n    ... on SyncReport {\n      syncedWorkspace {\n        ...WorkspaceSummary_workspace\n        ...WorkspaceMessages_workspace\n        id\n      }\n      pubSyncResults {\n        __typename\n        ... on PubSyncDetails {\n          __isPubSyncDetails: __typename\n          pubUrl\n        }\n        ... on SyncError {\n          reason\n        }\n        ... on SyncSuccess {\n          pubUrl\n        }\n        ... on DetailedSyncSuccess {\n          pushed {\n            documents {\n              ... on DocumentIngestion {\n                __isDocumentIngestion: __typename\n                document {\n                  __typename\n                  ... on ES4Document {\n                    id\n                  }\n                  ... on Node {\n                    __isNode: __typename\n                    id\n                  }\n                }\n              }\n              __typename\n            }\n            rejectedCount\n            ignoredCount\n            acceptedCount\n          }\n          pulled {\n            documents {\n              __typename\n              ... on DocumentIngestion {\n                __isDocumentIngestion: __typename\n                document {\n                  __typename\n                  ... on ES4Document {\n                    id\n                  }\n                  ... on Node {\n                    __isNode: __typename\n                    id\n                  }\n                }\n              }\n            }\n            rejectedCount\n            ignoredCount\n            acceptedCount\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment MessageEditor_document on ES4Document {\n  content\n}\n\nfragment Message_document on ES4Document {\n  ...MessageEditor_document\n  id\n  content\n  path\n  timestamp\n  deleteAfter\n  workspace {\n    address\n    id\n  }\n  author {\n    address\n    displayName\n    shortName\n    id\n  }\n}\n\nfragment WorkspaceMessages_workspace on Workspace {\n  address\n  documents(sortedBy: NEWEST, pathPrefixes: [\"/lobby\"]) {\n    __typename\n    ... on ES4Document {\n      id\n      timestamp\n      ...Message_document\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment WorkspaceSummary_workspace on Workspace {\n  name\n  address\n  population\n  documents(sortedBy: NEWEST, pathPrefixes: [\"/lobby\"]) {\n    __typename\n    ... on ES4Document {\n      id\n      content\n      author {\n        shortName\n        address\n        id\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '9bdf9fb8b2329e58dfc55611718d7169';
export default node;
