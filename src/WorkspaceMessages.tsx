import React, { useEffect } from "react";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { WorkspaceMessages_workspace } from "./__generated__/WorkspaceMessages_workspace.graphql";
import SyncMutation from "./mutations/SyncMutation";

type WorkspaceMessagesProps = {
  workspace: WorkspaceMessages_workspace;
  relay: RelayProp;
};

const WorkspaceMessages: React.FC<WorkspaceMessagesProps> = ({
  workspace,
  relay,
}) => {
  useEffect(() => {
    const disposable = SyncMutation.commit(
      relay.environment,
      {
        pubUrl: "https://earthstar-graphql-pub.glitch.me",
        workspace: workspace.address,
        format: "GRAPHQL",
      },
      (res) => {
        console.log(res);
      }
    );

    return () => disposable.dispose();
  }, [workspace.documents.length, workspace.address, relay.environment]);

  return (
    <>
      {workspace.documents.map((doc) => {
        return <li>{doc.content}</li>;
      })}
    </>
  );
};

export default createFragmentContainer(WorkspaceMessages, {
  workspace: graphql`
    fragment WorkspaceMessages_workspace on Workspace {
      address
      documents(sortedBy: NEWEST) {
        ... on ES4Document {
          id
          content
          timestamp
          author {
            shortName
            address
          }
        }
      }
    }
  `,
});
