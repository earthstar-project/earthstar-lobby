/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type StatusBar_workspace = {
    readonly address: string;
    readonly name: string;
    readonly author: {
        readonly displayName: string | null;
    } | null;
    readonly " $refType": "StatusBar_workspace";
};
export type StatusBar_workspace$data = StatusBar_workspace;
export type StatusBar_workspace$key = {
    readonly " $data"?: StatusBar_workspace$data;
    readonly " $fragmentRefs": FragmentRefs<"StatusBar_workspace">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "authorAddress"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "StatusBar_workspace",
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
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "address",
          "variableName": "authorAddress"
        }
      ],
      "concreteType": "Author",
      "kind": "LinkedField",
      "name": "author",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "displayName",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Workspace",
  "abstractKey": null
};
(node as any).hash = 'ffca70c1f098492178c3aebdba31e6d5';
export default node;
