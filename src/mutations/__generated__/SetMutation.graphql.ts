/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DocumentFormat = "ES4" | "%future added value";
export type AuthorInput = {
    address: string;
    secret: string;
};
export type NewDocumentInput = {
    format?: DocumentFormat | null;
    content: string;
    path: string;
    deleteAfter?: number | null;
};
export type SetMutationVariables = {
    author: AuthorInput;
    document: NewDocumentInput;
    workspace: string;
};
export type SetMutationResponse = {
    readonly set: {
        readonly __typename: "DocumentRejectedError";
        readonly reason: string;
    } | {
        readonly __typename: "SetDataSuccessResult";
        readonly document: {
            readonly id?: string;
            readonly workspace?: {
                readonly " $fragmentRefs": FragmentRefs<"WorkspaceMessages_workspace">;
            };
            readonly " $fragmentRefs": FragmentRefs<"Message_document">;
        };
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    };
};
export type SetMutation = {
    readonly response: SetMutationResponse;
    readonly variables: SetMutationVariables;
};



/*
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
        __typename
        ...Message_document
        ... on ES4Document {
          id
          workspace {
            ...WorkspaceMessages_workspace
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "author"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "document"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "workspace"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "author",
    "variableName": "author"
  },
  {
    "kind": "Variable",
    "name": "document",
    "variableName": "document"
  },
  {
    "kind": "Variable",
    "name": "workspace",
    "variableName": "workspace"
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
  "type": "DocumentRejectedError",
  "abstractKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isDocument"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "path",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timestamp",
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
    (v4/*: any*/)
  ],
  "storageKey": null
},
v11 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "set",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "Message_document"
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Workspace",
                        "kind": "LinkedField",
                        "name": "workspace",
                        "plural": false,
                        "selections": [
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "WorkspaceMessages_workspace"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "ES4Document",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "SetDataSuccessResult",
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
    "name": "SetMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "set",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
                  (v2/*: any*/),
                  (v5/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v6/*: any*/),
                      (v4/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Workspace",
                        "kind": "LinkedField",
                        "name": "workspace",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v4/*: any*/),
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
                              (v2/*: any*/),
                              (v5/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v6/*: any*/),
                                  (v4/*: any*/),
                                  (v7/*: any*/),
                                  (v8/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Workspace",
                                    "kind": "LinkedField",
                                    "name": "workspace",
                                    "plural": false,
                                    "selections": [
                                      (v9/*: any*/),
                                      (v4/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v10/*: any*/)
                                ],
                                "type": "ES4Document",
                                "abstractKey": null
                              },
                              (v11/*: any*/)
                            ],
                            "storageKey": "documents(pathPrefixes:[\"/lobby\"],sortedBy:\"NEWEST\")"
                          }
                        ],
                        "storageKey": null
                      },
                      (v10/*: any*/)
                    ],
                    "type": "ES4Document",
                    "abstractKey": null
                  },
                  (v11/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "SetDataSuccessResult",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0f524393dafe19a3050fb83cbf7d0c69",
    "id": null,
    "metadata": {},
    "name": "SetMutation",
    "operationKind": "mutation",
    "text": "mutation SetMutation(\n  $author: AuthorInput!\n  $document: NewDocumentInput!\n  $workspace: String!\n) {\n  set(author: $author, document: $document, workspace: $workspace) {\n    __typename\n    ... on DocumentRejectedError {\n      reason\n    }\n    ... on SetDataSuccessResult {\n      document {\n        __typename\n        ...Message_document\n        ... on ES4Document {\n          id\n          workspace {\n            ...WorkspaceMessages_workspace\n            id\n          }\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment MessageEditor_document on ES4Document {\n  content\n}\n\nfragment Message_document on Document {\n  __isDocument: __typename\n  __typename\n  ... on ES4Document {\n    ...MessageEditor_document\n    id\n    content\n    path\n    timestamp\n    workspace {\n      address\n      id\n    }\n    author {\n      address\n      displayName\n      shortName\n      id\n    }\n  }\n}\n\nfragment WorkspaceMessages_workspace on Workspace {\n  address\n  documents(sortedBy: NEWEST, pathPrefixes: [\"/lobby\"]) {\n    __typename\n    ...Message_document\n    ... on ES4Document {\n      id\n      timestamp\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5f88bee194157e17bdd182de948351ac';
export default node;
