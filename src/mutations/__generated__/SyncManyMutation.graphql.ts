/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SyncInput = {
    address: string;
    pubs: Array<string>;
};
export type SyncManyMutationVariables = {
    workspaces: Array<SyncInput>;
};
export type SyncManyMutationResponse = {
    readonly syncMany: ReadonlyArray<{
        readonly __typename: "SyncError";
        readonly reason: string;
    } | {
        readonly __typename: "SyncSuccess";
        readonly syncedWorkspace: {
            readonly " $fragmentRefs": FragmentRefs<"WorkspaceSummary_workspace" | "WorkspaceMessages_workspace">;
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
            readonly " $fragmentRefs": FragmentRefs<"WorkspaceMessages_workspace" | "WorkspaceSummary_workspace">;
        };
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }>;
};
export type SyncManyMutation = {
    readonly response: SyncManyMutationResponse;
    readonly variables: SyncManyMutationVariables;
};



/*
mutation SyncManyMutation(
  $workspaces: [SyncInput!]!
) {
  syncMany(workspaces: $workspaces) {
    __typename
    ... on SyncError {
      reason
    }
    ... on SyncSuccess {
      syncedWorkspace {
        ...WorkspaceSummary_workspace
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
        ...WorkspaceSummary_workspace
        id
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "workspaces"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "workspaces",
    "variableName": "workspaces"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
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
v4 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "WorkspaceSummary_workspace"
},
v5 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "WorkspaceMessages_workspace"
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
  "name": "name",
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
  "name": "population",
  "storageKey": null
},
v12 = [
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
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shortName",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timestamp",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "path",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "deleteAfter",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "Workspace",
  "kind": "LinkedField",
  "name": "workspace",
  "plural": false,
  "selections": [
    (v10/*: any*/),
    (v13/*: any*/)
  ],
  "storageKey": null
},
v21 = {
  "kind": "InlineFragment",
  "selections": [
    (v13/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SyncManyMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "syncMany",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
                  (v4/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "SyncSuccess",
            "abstractKey": null
          },
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
                  (v5/*: any*/),
                  (v4/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SyncManyMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "syncMany",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": (v12/*: any*/),
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "documents",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v13/*: any*/),
                          (v14/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Author",
                            "kind": "LinkedField",
                            "name": "author",
                            "plural": false,
                            "selections": [
                              (v15/*: any*/),
                              (v10/*: any*/),
                              (v13/*: any*/),
                              (v16/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v17/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v20/*: any*/)
                        ],
                        "type": "ES4Document",
                        "abstractKey": null
                      },
                      (v21/*: any*/)
                    ],
                    "storageKey": "documents(pathPrefixes:[\"/lobby\"],sortedBy:\"NEWEST\")"
                  },
                  (v13/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "SyncSuccess",
            "abstractKey": null
          },
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
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": (v12/*: any*/),
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "documents",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v13/*: any*/),
                          (v17/*: any*/),
                          (v14/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v20/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Author",
                            "kind": "LinkedField",
                            "name": "author",
                            "plural": false,
                            "selections": [
                              (v10/*: any*/),
                              (v16/*: any*/),
                              (v15/*: any*/),
                              (v13/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "ES4Document",
                        "abstractKey": null
                      },
                      (v21/*: any*/)
                    ],
                    "storageKey": "documents(pathPrefixes:[\"/lobby\"],sortedBy:\"NEWEST\")"
                  },
                  (v9/*: any*/),
                  (v11/*: any*/),
                  (v13/*: any*/)
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
    "cacheID": "4961bbe3893a503a2cfa2a176c8819e2",
    "id": null,
    "metadata": {},
    "name": "SyncManyMutation",
    "operationKind": "mutation",
    "text": "mutation SyncManyMutation(\n  $workspaces: [SyncInput!]!\n) {\n  syncMany(workspaces: $workspaces) {\n    __typename\n    ... on SyncError {\n      reason\n    }\n    ... on SyncSuccess {\n      syncedWorkspace {\n        ...WorkspaceSummary_workspace\n        ...WorkspaceMessages_workspace\n        id\n      }\n    }\n    ... on DetailedSyncSuccess {\n      pushed {\n        rejectedCount\n        ignoredCount\n        acceptedCount\n      }\n      pulled {\n        rejectedCount\n        ignoredCount\n        acceptedCount\n      }\n      syncedWorkspace {\n        ...WorkspaceMessages_workspace\n        ...WorkspaceSummary_workspace\n        id\n      }\n    }\n  }\n}\n\nfragment MessageEditor_document on ES4Document {\n  content\n}\n\nfragment Message_document on ES4Document {\n  ...MessageEditor_document\n  id\n  content\n  path\n  timestamp\n  deleteAfter\n  workspace {\n    address\n    id\n  }\n  author {\n    address\n    displayName\n    shortName\n    id\n  }\n}\n\nfragment WorkspaceMessages_workspace on Workspace {\n  address\n  documents(sortedBy: NEWEST, pathPrefixes: [\"/lobby\"]) {\n    __typename\n    ... on ES4Document {\n      id\n      timestamp\n      ...Message_document\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment WorkspaceSummary_workspace on Workspace {\n  name\n  address\n  population\n  documents(sortedBy: NEWEST, pathPrefixes: [\"/lobby\"]) {\n    __typename\n    ... on ES4Document {\n      id\n      content\n      author {\n        shortName\n        address\n        id\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3d08cca7709affe8b08a0b85ac3733dc';
export default node;
