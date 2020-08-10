/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DocumentFormat = "ES4" | "%future added value";
export type AuthorInput = {
    address: string;
    secret: string;
};
export type NewDocumentInput = {
    format?: DocumentFormat | null;
    content: string;
    path: string;
};
export type SetMutationVariables = {
    author: AuthorInput;
    document: NewDocumentInput;
    workspace: string;
};
export type SetMutationResponse = {
    readonly set: {
        readonly __typename: "SetDataSuccessResult";
        readonly document: {
            readonly workspace?: {
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
    ... on SetDataSuccessResult {
      document {
        __typename
        ... on ES4Document {
          workspace {
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
        ... on Node {
          __isNode: __typename
          id
        }
      }
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "sortedBy",
    "value": "NEWEST"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timestamp",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shortName",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v9 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/)
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
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Workspace",
                        "kind": "LinkedField",
                        "name": "workspace",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": (v4/*: any*/),
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "documents",
                            "plural": true,
                            "selections": [
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v3/*: any*/),
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Author",
                                    "kind": "LinkedField",
                                    "name": "author",
                                    "plural": false,
                                    "selections": [
                                      (v7/*: any*/),
                                      (v8/*: any*/)
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
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Workspace",
                        "kind": "LinkedField",
                        "name": "workspace",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": (v4/*: any*/),
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "documents",
                            "plural": true,
                            "selections": [
                              (v2/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v3/*: any*/),
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Author",
                                    "kind": "LinkedField",
                                    "name": "author",
                                    "plural": false,
                                    "selections": [
                                      (v7/*: any*/),
                                      (v8/*: any*/),
                                      (v3/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "type": "ES4Document",
                                "abstractKey": null
                              },
                              (v9/*: any*/)
                            ],
                            "storageKey": "documents(sortedBy:\"NEWEST\")"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "ES4Document",
                    "abstractKey": null
                  },
                  (v9/*: any*/)
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
    "cacheID": "45352c3c41ed9399c106e377acb05da7",
    "id": null,
    "metadata": {},
    "name": "SetMutation",
    "operationKind": "mutation",
    "text": "mutation SetMutation(\n  $author: AuthorInput!\n  $document: NewDocumentInput!\n  $workspace: String!\n) {\n  set(author: $author, document: $document, workspace: $workspace) {\n    __typename\n    ... on SetDataSuccessResult {\n      document {\n        __typename\n        ... on ES4Document {\n          workspace {\n            id\n            documents(sortedBy: NEWEST) {\n              __typename\n              ... on ES4Document {\n                id\n                content\n                timestamp\n                author {\n                  shortName\n                  address\n                  id\n                }\n              }\n              ... on Node {\n                __isNode: __typename\n                id\n              }\n            }\n          }\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd580bf29f938d2d7d109455a25858637';
export default node;
