/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MessageComposer_workspace = {
    readonly address: string;
    readonly " $refType": "MessageComposer_workspace";
};
export type MessageComposer_workspace$data = MessageComposer_workspace;
export type MessageComposer_workspace$key = {
    readonly " $data"?: MessageComposer_workspace$data;
    readonly " $fragmentRefs": FragmentRefs<"MessageComposer_workspace">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MessageComposer_workspace",
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
(node as any).hash = 'fa37c25c381fdf3d4e4720d9ef1796b6';
export default node;
