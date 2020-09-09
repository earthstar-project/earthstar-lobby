/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DashboardQueryVariables = {};
export type DashboardQueryResponse = {
    readonly workspaces: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"WorkspaceSummary_workspace" | "WorkspacePersistor_workspaces">;
    }>;
    readonly " $fragmentRefs": FragmentRefs<"DashboardStatusBit_rootQuery">;
};
export type DashboardQuery = {
    readonly response: DashboardQueryResponse;
    readonly variables: DashboardQueryVariables;
};



/*
query DashboardQuery {
  ...DashboardStatusBit_rootQuery
  workspaces {
    id
    ...WorkspaceSummary_workspace
    ...WorkspacePersistor_workspaces
  }
}

fragment DashboardStatusBit_rootQuery on Query {
  workspaces {
    address
    id
  }
}

fragment WorkspacePersistor_workspaces on Workspace {
  address
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DashboardQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Workspace",
        "kind": "LinkedField",
        "name": "workspaces",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WorkspaceSummary_workspace"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WorkspacePersistor_workspaces"
          }
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "DashboardStatusBit_rootQuery"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DashboardQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Workspace",
        "kind": "LinkedField",
        "name": "workspaces",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
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
                  (v0/*: any*/),
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
                      (v1/*: any*/),
                      (v0/*: any*/)
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
                  (v0/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
              }
            ],
            "storageKey": "documents(pathPrefixes:[\"/lobby\"],sortedBy:\"NEWEST\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7e419803170d33f5f45fe96300484a2d",
    "id": null,
    "metadata": {},
    "name": "DashboardQuery",
    "operationKind": "query",
    "text": "query DashboardQuery {\n  ...DashboardStatusBit_rootQuery\n  workspaces {\n    id\n    ...WorkspaceSummary_workspace\n    ...WorkspacePersistor_workspaces\n  }\n}\n\nfragment DashboardStatusBit_rootQuery on Query {\n  workspaces {\n    address\n    id\n  }\n}\n\nfragment WorkspacePersistor_workspaces on Workspace {\n  address\n}\n\nfragment WorkspaceSummary_workspace on Workspace {\n  name\n  address\n  population\n  documents(sortedBy: NEWEST, pathPrefixes: [\"/lobby\"]) {\n    __typename\n    ... on ES4Document {\n      id\n      content\n      author {\n        shortName\n        address\n        id\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '06fc14c5dfbca33c35d3398454e47aa6';
export default node;
