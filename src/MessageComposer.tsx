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
import LabelledCheckbox from "./LabelledCheckbox";
import NumberInput from "./NumberInput";

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
  const [isEphemeral, setIsEphemeral] = useState(false);
  const [deleteAfterHours, setDeleteAfterHours] = useState(1);

  // The path the document will be stored at
  const path = `/lobby/~${author.address}/${
    isEphemeral ? "!" : ""
  }${Date.now()}.txt`;

  return (
    <MaxWidth>
      <div
        css={css`
          display: flex;
          flex-direction: column;
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
        <div
          css={css`
            display: flex;
            justify-content: space-between;
          `}
        >
          <LabelledCheckbox
            isChecked={isEphemeral}
            onChange={(isEphemeral) => setIsEphemeral(isEphemeral)}
          >
            <span
              css={css`
                display: flex;
                align-items: center;
                color: ${(props) =>
                  isEphemeral ? "inherit" : props.theme.colours.fgHint};
                font-size: 0.8em;
              `}
            >
              {"Delete after "}
              <NumberInput
                css={css`
                  margin: 0 4px;
                `}
                value={deleteAfterHours}
                min={1}
                max={24}
                onChange={(e) => {
                  if (!isEphemeral) {
                    setIsEphemeral(true);
                  }

                  setDeleteAfterHours(parseInt(e.target.value));
                }}
              />
              {" hours"}
            </span>
          </LabelledCheckbox>
          <Button
            onClick={() => {
              SetMutation.commit(
                relay.environment,
                {
                  author,
                  document: {
                    content: message,
                    path,
                    deleteAfter: isEphemeral
                      ? Date.now() * 1000 + deleteAfterHours * 1000000 * 60 * 60
                      : null,
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
