import React, { useState } from "react";
import Button from "./Button";
import TextArea from "./TextArea";
import { css } from "styled-components/macro";
import MaxWidth from "./MaxWidth";
import LabelledCheckbox from "./LabelledCheckbox";
import NumberInput from "./NumberInput";
import { useDocument, useCurrentAuthor } from "react-earthstar";

type MessageComposerProps = {
  workspace: string;
};

const MessageComposer: React.FC<MessageComposerProps> = ({ workspace }) => {
  const [message, setMessage] = useState("");
  const [isEphemeral, setIsEphemeral] = useState(false);
  const [deleteAfterHours, setDeleteAfterHours] = useState(1);

  const [currentAuthor] = useCurrentAuthor();

  // The path the document will be stored at
  const path = `/lobby/~${currentAuthor?.address}/${
    isEphemeral ? "!" : ""
  }${Date.now()}.txt`;

  const [, setMessageDoc] = useDocument(path, workspace);

  return (
    <MaxWidth>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          padding: 8px 0;
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
              setMessageDoc(
                message,
                isEphemeral
                  ? Date.now() * 1000 + deleteAfterHours * 1000000 * 60 * 60
                  : null
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

export default MessageComposer;
