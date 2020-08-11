/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type StatusBar_workspace = {
    readonly address: string;
    readonly name: string;
    readonly " $refType": "StatusBar_workspace";
};
export type StatusBar_workspace$data = StatusBar_workspace;
export type StatusBar_workspace$key = {
    readonly " $data"?: StatusBar_workspace$data;
    readonly " $fragmentRefs": FragmentRefs<"StatusBar_workspace">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
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
    }
  ],
  "type": "Workspace",
  "abstractKey": null
};
(node as any).hash = '3a2a989b5bd0e194ca5cb4aa3b27e92c';
export default node;
