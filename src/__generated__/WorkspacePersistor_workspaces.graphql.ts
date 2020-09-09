/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorkspacePersistor_workspaces = ReadonlyArray<{
    readonly address: string;
    readonly " $refType": "WorkspacePersistor_workspaces";
}>;
export type WorkspacePersistor_workspaces$data = WorkspacePersistor_workspaces;
export type WorkspacePersistor_workspaces$key = ReadonlyArray<{
    readonly " $data"?: WorkspacePersistor_workspaces$data;
    readonly " $fragmentRefs": FragmentRefs<"WorkspacePersistor_workspaces">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "WorkspacePersistor_workspaces",
  "selections": [
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
(node as any).hash = '716608215bde5e5e395572cc6871f126';
export default node;
