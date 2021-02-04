import React, { useState } from "react";
import TextArea from "./TextArea";
import Button from "./Button";
import { Document } from "earthstar";

type MessageEditorProps = {
  document: Document;
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
      <TextArea value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={() => updateMessage(message)}>{"Save"}</Button>
      {" or "}
      <Button onClick={cancelEditing}>{"Cancel"}</Button>
    </>
  );
};

export default MessageEditor;
