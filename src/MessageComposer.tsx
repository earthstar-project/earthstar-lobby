import React, { useState } from "react";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { MessageComposer_workspace } from "./__generated__/MessageComposer_workspace.graphql";
import SetMutation from "./mutations/SetMutation";
import { AuthorKeypair } from "earthstar";
import Button from "./Button";
import TextArea from "./TextArea";
import { css } from "styled-components/macro";
import MaxWidth from "./MaxWidth";

type MessageComposerProps = {
  workspace: MessageComposer_workspace;
  relay: RelayProp;
  setHasLocalWorkspaceChanges: (hasChanges: boolean) => void;
  author: AuthorKeypair;
};

const MessageComposer: React.FC<MessageComposerProps> = ({
  workspace,
  relay,
  setHasLocalWorkspaceChanges,
  author,
}) => {
  const [message, setMessage] = useState("");

  // The path the document will be stored at
  const path = `/lobby/~${author.address}/${Date.now()}.txt`;

  return (
    <MaxWidth>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding: 8px;
        `}
      >
        <TextArea
          placeholder={"Write a message"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          css={css`
            margin-bottom: 4px;
          `}
        />
        <Button
          onClick={() => {
            SetMutation.commit(
              relay.environment,
              {
                author,
                document: {
                  content: message,
                  path,
                },
                workspace: workspace.address,
              },
              (result) => {
                if (result.set.__typename === "SetDataSuccessResult") {
                  setHasLocalWorkspaceChanges(true);
                  setMessage("");
                }
              }
            );
            setMessage("");
          }}
        >
          {"Post"}
        </Button>
      </div>
    </MaxWidth>
  );
};

// This declares which data MessageComposer wants from Relay.
// workspace will be fed in as a prop
export default createFragmentContainer(MessageComposer, {
  workspace: graphql`
    fragment MessageComposer_workspace on Workspace {
      address
    }
  `,
});
