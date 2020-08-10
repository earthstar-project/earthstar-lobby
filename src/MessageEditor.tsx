import React, { useState } from "react";
import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { MessageEditor_document } from "./__generated__/MessageEditor_document.graphql";

type MessageEditorProps = {
  document: MessageEditor_document;
  cancelEditing: () => void;
  updateMessage: (newMessage: string) => void;
};

const MessageEditor: React.FC<MessageEditorProps> = ({
  document,
  cancelEditing,
  updateMessage,
}) => {
  const [message, setMessage] = useState(document.content);

  return (
    <>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => updateMessage(message)}>{"Save"}</button>
      <button onClick={cancelEditing}>{"Cancel"}</button>
    </>
  );
};

export default createFragmentContainer(MessageEditor, {
  document: graphql`
    fragment MessageEditor_document on ES4Document {
      content
    }
  `,
});
