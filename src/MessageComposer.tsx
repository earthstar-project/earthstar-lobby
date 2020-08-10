import React, { useState, useMemo } from "react";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { MessageComposer_workspace } from "./__generated__/MessageComposer_workspace.graphql";
import SetMutation from "./mutations/SetMutation";
import { generateAuthorKeypair, isErr } from "earthstar";

type MessageComposerProps = {
  workspace: MessageComposer_workspace;
  relay: RelayProp;
};

const MessageComposer: React.FC<MessageComposerProps> = ({
  workspace,
  relay,
}) => {
  const [message, setMessage] = useState("");
  const author = useMemo(() => {
    return generateAuthorKeypair("gwil");
  }, []);

  if (isErr(author)) {
    return <div>{author.message}</div>;
  }

  const path = `/lobby/~${author.address}/${Date.now()}`;

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        onClick={() => {
          SetMutation.commit(relay.environment, {
            author,
            document: {
              content: message,
              path,
            },
            workspace: workspace.address,
          });
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
