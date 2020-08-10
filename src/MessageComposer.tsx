import React, { useState } from "react";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { MessageComposer_workspace } from "./__generated__/MessageComposer_workspace.graphql";
import SetMutation from "./mutations/SetMutation";
import { AuthorKeypair } from "earthstar";

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

  const path = `/lobby/~${author.address}/${Date.now()}`;

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
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
      </button>
    </div>
  );
};

export default createFragmentContainer(MessageComposer, {
  workspace: graphql`
    fragment MessageComposer_workspace on Workspace {
      address
    }
  `,
});
