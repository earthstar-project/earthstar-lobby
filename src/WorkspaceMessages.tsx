import React from "react";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { WorkspaceMessages_workspace } from "./__generated__/WorkspaceMessages_workspace.graphql";
import Message from "./Message";
import { AuthorKeypair } from "earthstar";

type WorkspaceMessagesProps = {
  workspace: WorkspaceMessages_workspace;
  relay: RelayProp;
  author: AuthorKeypair;
  setHasLocalWorkspaceChanges: (hasChanges: boolean) => void;
};

const WorkspaceMessages: React.FC<WorkspaceMessagesProps> = ({
  workspace,
  author,
  setHasLocalWorkspaceChanges,
}) => {
  return (
    <>
      {workspace.documents.map((doc) => {
        return (
          <Message
            setHasLocalWorkspaceChanges={setHasLocalWorkspaceChanges}
            author={author}
            document={doc}
          />
        );
      })}
    </>
  );
};

export default createFragmentContainer(WorkspaceMessages, {
  workspace: graphql`
    fragment WorkspaceMessages_workspace on Workspace {
      address
      documents(sortedBy: NEWEST) {
        ...Message_document
      }
    }
  `,
});
