/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Message_document = {
    readonly __typename: "ES4Document";
    readonly id: string;
    readonly content: string;
    readonly path: string;
    readonly timestamp: number;
    readonly deleteAfter: number | null;
    readonly workspace: {
        readonly address: string;
    };
    readonly author: {
        readonly address: string;
        readonly displayName: string | null;
        readonly shortName: string;
    };
    readonly " $fragmentRefs": FragmentRefs<"MessageEditor_document">;
    readonly " $refType": "Message_document";
} | {
    /*This will never be '%other', but we need some
    value in case none of the concrete values match.*/
    readonly __typename: "%other";
    readonly " $refType": "Message_document";
};
export type Message_document$data = Message_document;
export type Message_document$key = {
    readonly " $data"?: Message_document$data;
    readonly " $fragmentRefs": FragmentRefs<"Message_document">;
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
  "name": "Message_document",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
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
          "name": "content",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "path",
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
          "kind": "ScalarField",
          "name": "deleteAfter",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Workspace",
          "kind": "LinkedField",
          "name": "workspace",
          "plural": false,
          "selections": [
            (v0/*: any*/)
          ],
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
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "displayName",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "shortName",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MessageEditor_document"
        }
      ],
      "type": "ES4Document",
      "abstractKey": null
    }
  ],
  "type": "Document",
  "abstractKey": "__isDocument"
};
})();
(node as any).hash = '42dae8e46d53dec32470c56830c5ed40';
export default node;
