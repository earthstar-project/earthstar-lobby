/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorkspaceMessages_workspace = {
    readonly address: string;
    readonly documents: ReadonlyArray<{
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
        }
      ],
      "storageKey": "documents(sortedBy:\"NEWEST\")"
    }
  ],
  "type": "Workspace",
  "abstractKey": null
};
(node as any).hash = 'd1a81549248f4e90ea3025d01feb7a35';
export default node;
