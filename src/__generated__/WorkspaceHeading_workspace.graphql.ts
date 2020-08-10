/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorkspaceHeading_workspace = {
    readonly address: string;
    readonly name: string;
    readonly " $refType": "WorkspaceHeading_workspace";
};
export type WorkspaceHeading_workspace$data = WorkspaceHeading_workspace;
export type WorkspaceHeading_workspace$key = {
    readonly " $data"?: WorkspaceHeading_workspace$data;
    readonly " $fragmentRefs": FragmentRefs<"WorkspaceHeading_workspace">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorkspaceHeading_workspace",
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
(node as any).hash = '9e98eadf80fdd12b04556d41225399b5';
export default node;
