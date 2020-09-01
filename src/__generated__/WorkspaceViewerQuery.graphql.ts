/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorkspaceViewerQueryVariables = {
    workspace: string;
};
export type WorkspaceViewerQueryResponse = {
    readonly workspace: {
        readonly " $fragmentRefs": FragmentRefs<"WorkspaceStatusBit_workspace" | "WorkspaceMessages_workspace" | "MessageComposer_workspace">;
    } | null;
};
export type WorkspaceViewerQuery = {
    readonly response: WorkspaceViewerQueryResponse;
    readonly variables: WorkspaceViewerQueryVariables;
};



/*
query WorkspaceViewerQuery(
  $workspace: String!
) {
  workspace(address: $workspace) {
    ...WorkspaceStatusBit_workspace
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

fragment WorkspaceStatusBit_workspace on Workspace {
  name
  address
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "workspace"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "address",
    "variableName": "workspace"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "WorkspaceViewerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Workspace",
        "kind": "LinkedField",
        "name": "workspace",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WorkspaceStatusBit_workspace"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WorkspaceViewerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Workspace",
        "kind": "LinkedField",
        "name": "workspace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          (v2/*: any*/),
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
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/),
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
                    "name": "content",
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
                      (v2/*: any*/),
                      (v3/*: any*/)
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
                      (v2/*: any*/),
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
                      (v3/*: any*/)
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
                  (v3/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
              }
            ],
            "storageKey": "documents(pathPrefixes:[\"/lobby\"],sortedBy:\"NEWEST\")"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6ca6f72c30bec27e14f94b6a75670d00",
    "id": null,
    "metadata": {},
    "name": "WorkspaceViewerQuery",
    "operationKind": "query",
    "text": "query WorkspaceViewerQuery(\n  $workspace: String!\n) {\n  workspace(address: $workspace) {\n    ...WorkspaceStatusBit_workspace\n    ...WorkspaceMessages_workspace\n    ...MessageComposer_workspace\n    id\n  }\n}\n\nfragment MessageComposer_workspace on Workspace {\n  address\n}\n\nfragment MessageEditor_document on ES4Document {\n  content\n}\n\nfragment Message_document on ES4Document {\n  ...MessageEditor_document\n  id\n  content\n  path\n  timestamp\n  deleteAfter\n  workspace {\n    address\n    id\n  }\n  author {\n    address\n    displayName\n    shortName\n    id\n  }\n}\n\nfragment WorkspaceMessages_workspace on Workspace {\n  address\n  documents(sortedBy: NEWEST, pathPrefixes: [\"/lobby\"]) {\n    __typename\n    ... on ES4Document {\n      id\n      timestamp\n      ...Message_document\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment WorkspaceStatusBit_workspace on Workspace {\n  name\n  address\n}\n"
  }
};
})();
(node as any).hash = 'db0c286de47cd62e6eeecf6e7bc03e94';
export default node;
