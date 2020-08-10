import React, { useState } from "react";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Message_document } from "./__generated__/Message_document.graphql";
import SetMutation from "./mutations/SetMutation";
import { AuthorKeypair } from "earthstar";
import MessageEditor from "./MessageEditor";

type MessageProps = {
  document: Message_document;
  relay: RelayProp;
  author: AuthorKeypair;
  setHasLocalWorkspaceChanges: (hasChanges: boolean) => void;
};

const Message: React.FC<MessageProps> = ({
  document,
  relay,
  author,
  setHasLocalWorkspaceChanges,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  if (document.__typename !== "ES4Document") {
    return <div>{"???"}</div>;
  }

  const set = (message: string) => {
    SetMutation.commit(
      relay.environment,
      {
        author,
        document: {
          content: message,
          path: document.path,
        },
        workspace: document.workspace.address,
      },
      (res) => {
        if (res.set.__typename === "SetDataSuccessResult") {
          setHasLocalWorkspaceChanges(true);
        }
        if (res.set.__typename === "DocumentRejectedError") {
          console.error("Document was not edited: ", res.set.reason);
        }
      }
    );
  };

  if (isEditing) {
    return (
      <MessageEditor
        cancelEditing={() => setIsEditing(false)}
        document={document}
        updateMessage={(newMessage: string) => {
          set(newMessage);
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <div>{document.content}</div>
      {author.address === document.author.address ? (
        <div>
          <button onClick={() => setIsEditing(true)}>{"Edit"}</button>
          <button
            onClick={() => {
              const reallyWantsToDelete = window.confirm(
                "Are you sure you want to delete this message?"
              );

              if (reallyWantsToDelete) {
                set("");
              }
            }}
          >
            {"Delete"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default createFragmentContainer(Message, {
  document: graphql`
    fragment Message_document on Document {
      __typename
      ... on ES4Document {
        ...MessageEditor_document
        id
        content
        path
        workspace {
          address
        }
        author {
          address
        }
      }
    }
  `,
});
