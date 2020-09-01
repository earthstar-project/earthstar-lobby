/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorkspaceStatusBit_workspace = {
    readonly name: string;
    readonly address: string;
    readonly " $refType": "WorkspaceStatusBit_workspace";
};
export type WorkspaceStatusBit_workspace$data = WorkspaceStatusBit_workspace;
export type WorkspaceStatusBit_workspace$key = {
    readonly " $data"?: WorkspaceStatusBit_workspace$data;
    readonly " $fragmentRefs": FragmentRefs<"WorkspaceStatusBit_workspace">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorkspaceStatusBit_workspace",
  "selections": [
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
      "name": "address",
      "storageKey": null
    }
  ],
  "type": "Workspace",
  "abstractKey": null
};
(node as any).hash = 'cf9319f04c029e66fe461d3928c7bd80';
export default node;
