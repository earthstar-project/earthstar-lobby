/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorkspaceMessages_workspace = {
    readonly address: string;
    readonly documents: ReadonlyArray<{
        readonly id?: string;
        readonly content?: string;
        readonly timestamp?: number;
        readonly author?: {
            readonly shortName: string;
            readonly address: string;
        };
    }>;
    readonly " $refType": "WorkspaceMessages_workspace";
};
export type WorkspaceMessages_workspace$data = WorkspaceMessages_workspace;
export type WorkspaceMessages_workspace$key = {
    readonly " $data"?: WorkspaceMessages_workspace$data;
    readonly " $fragmentRefs": FragmentRefs<"WorkspaceMessages_workspace">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "address",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorkspaceMessages_workspace",
  "selections": [
    (v0/*: any*/),
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
              "name": "content",
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
              "alias": null,
              "args": null,
              "concreteType": "Author",
              "kind": "LinkedField",
              "name": "author",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "shortName",
                  "storageKey": null
                },
                (v0/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "type": "ES4Document",
          "abstractKey": null
        }
      ],
      "storageKey": "documents(sortedBy:\"NEWEST\")"
    }
  ],
  "type": "Workspace",
  "abstractKey": null
};
})();
(node as any).hash = '255fbb036900a0b981b355c17ff56c57';
export default node;
