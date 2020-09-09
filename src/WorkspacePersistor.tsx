import { useEffect } from "react";
import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { useWorkspaces } from "./util/hooks";

import { WorkspacePersistor_workspaces } from "./__generated__/WorkspacePersistor_workspaces.graphql";

type WorkspacePersistorProps = {
  workspaces: WorkspacePersistor_workspaces;
};

const WorkspacePersistor = ({ workspaces }: WorkspacePersistorProps) => {
  const [_workspaces, setWorkspaces] = useWorkspaces();

  useEffect(() => {
    setWorkspaces(workspaces.map(({ address }) => address));
  }, [workspaces]);

  return null;
};

export default createFragmentContainer(WorkspacePersistor, {
  workspaces: graphql`
    fragment WorkspacePersistor_workspaces on Workspace @relay(plural: true) {
      address
    }
  `,
});
