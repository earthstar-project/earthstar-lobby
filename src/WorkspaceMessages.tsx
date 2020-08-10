import React from "react";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { WorkspaceMessages_workspace } from "./__generated__/WorkspaceMessages_workspace.graphql";
import Message from "./Message";
import { AuthorKeypair } from "earthstar";
import { WorkspaceHeading_workspace } from "./__generated__/WorkspaceHeading_workspace.graphql";

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
  const docsByDate = workspace.documents.reduce((acc, doc) => {
    if (!doc.timestamp) {
      return acc;
    }

    const docDate = new Date(doc.timestamp / 1000);
    const docDateString = docDate.toDateString();
    const accDateCollection = acc[docDateString] || [];

    return {
      ...acc,
      [docDateString]: [...accDateCollection, doc],
    };
  }, {} as Record<string, WorkspaceMessages_workspace["documents"][0][]>);

  return (
    <>
      {Object.keys(docsByDate).map((key) => {
        console.log(key);
        const title = new Date(Date.parse(key)).toLocaleDateString(["en-en"]);
        const documents = docsByDate[key];

        return (
          <>
            <h2>{title}</h2>
            {documents.map((doc) => {
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
        ... on ES4Document {
          timestamp
        }
      }
    }
  `,
});
