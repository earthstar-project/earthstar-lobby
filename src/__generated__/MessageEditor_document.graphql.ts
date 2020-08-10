/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MessageEditor_document = {
    readonly content: string;
    readonly " $refType": "MessageEditor_document";
};
export type MessageEditor_document$data = MessageEditor_document;
export type MessageEditor_document$key = {
    readonly " $data"?: MessageEditor_document$data;
    readonly " $fragmentRefs": FragmentRefs<"MessageEditor_document">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MessageEditor_document",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "content",
      "storageKey": null
    }
  ],
  "type": "ES4Document",
  "abstractKey": null
};
(node as any).hash = 'e13aa2b04d1e22369f72041220afc7ec';
export default node;
