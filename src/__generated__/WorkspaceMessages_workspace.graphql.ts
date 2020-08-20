/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorkspaceMessages_workspace = {
    readonly address: string;
    readonly documents: ReadonlyArray<{
        readonly __typename: "ES4Document";
        readonly id: string;
        readonly timestamp: number;
        readonly " $fragmentRefs": FragmentRefs<"Message_document">;
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }>;
    readonly " $refType": "WorkspaceMessages_workspace";
};
export type WorkspaceMessages_workspace$data = WorkspaceMessages_workspace;
export type WorkspaceMessages_workspace$key = {
    readonly " $data"?: WorkspaceMessages_workspace$data;
    readonly " $fragmentRefs": FragmentRefs<"WorkspaceMessages_workspace">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorkspaceMessages_workspace",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "address",
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "Message_document"
            }
          ],
          "type": "ES4Document",
          "abstractKey": null
        }
      ],
      "storageKey": "documents(pathPrefixes:[\"/lobby\"],sortedBy:\"NEWEST\")"
    }
  ],
  "type": "Workspace",
  "abstractKey": null
};
(node as any).hash = '52fadb97f07bf9485dc8731e1f46c20e';
export default node;
