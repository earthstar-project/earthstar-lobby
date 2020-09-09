/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DashboardStatusBit_rootQuery = {
    readonly workspaces: ReadonlyArray<{
        readonly address: string;
    }>;
    readonly " $refType": "DashboardStatusBit_rootQuery";
};
export type DashboardStatusBit_rootQuery$data = DashboardStatusBit_rootQuery;
export type DashboardStatusBit_rootQuery$key = {
    readonly " $data"?: DashboardStatusBit_rootQuery$data;
    readonly " $fragmentRefs": FragmentRefs<"DashboardStatusBit_rootQuery">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DashboardStatusBit_rootQuery",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Workspace",
      "kind": "LinkedField",
      "name": "workspaces",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "address",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = '25024cc5b8342424ac8e107c4d9a209f';
export default node;
