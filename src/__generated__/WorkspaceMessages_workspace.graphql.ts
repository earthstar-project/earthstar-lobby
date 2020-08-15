/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorkspaceMessages_workspace = {
    readonly address: string;
    readonly documents: ReadonlyArray<{
        readonly id?: string;
        readonly timestamp?: number;
        readonly " $fragmentRefs": FragmentRefs<"Message_document">;
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "Message_document"
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
(node as any).hash = 'c3f30e9983d5a8a9db61022d77452bf5';
export default node;
