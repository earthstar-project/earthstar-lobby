import React, { useState, useRef } from "react";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { Message_document } from "./__generated__/Message_document.graphql";
import SetMutation from "./mutations/SetMutation";
import { AuthorKeypair } from "earthstar";
import MessageEditor from "./MessageEditor";
import { fromDate } from "dot-beat-time";
import NavButton from "./NavButton";
import ContextualPanel from "./ContextualPanel";
import "styled-components/macro";
import Button from "./Button";
import MaxWidth from "./MaxWidth";

type MessageProps = {
  document: Message_document;
  relay: RelayProp;
  author: AuthorKeypair | null;
  setHasLocalWorkspaceChanges: (hasChanges: boolean) => void;
};

type MessagePanel = "options" | "editing" | "none";

const Message: React.FC<MessageProps> = ({
  document,
  relay,
  author,
  setHasLocalWorkspaceChanges,
}) => {
  const [openPanel, setOpenPanel] = useState<MessagePanel>("none");

  // For pointing the contextual panel at the right place
  const buttonRef = useRef(null);

  // This shouldn't happen, but just in case
  if (document.__typename !== "ES4Document") {
    return <div>{"???"}</div>;
  }

  // A function for editing/deleting the document
  const set = author
    ? (message: string) => {
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
      }
    : () => {};

  return (
    <div style={{ marginBottom: 16 }}>
      {openPanel !== "none" ? (
        <ContextualPanel pointsToRef={buttonRef} accentColour={"gamma"}>
          {openPanel === "editing" ? (
            <MessageEditor
              cancelEditing={() => setOpenPanel("none")}
              document={document}
              updateMessage={(newMessage: string) => {
                set(newMessage);
                setOpenPanel("none");
              }}
            />
          ) : author && author.address === document.author.address ? (
            <div>
              <Button onClick={() => setOpenPanel("editing")}>{"Edit"}</Button>
              {" or "}
              <Button
                onClick={() => {
                  const reallyWantsToDelete = window.confirm(
                    "Are you sure you want to delete this message?"
                  );

                  if (reallyWantsToDelete) {
                    set("");
                  }
                }}
              >
                {"Delete this message"}
              </Button>
            </div>
          ) : null}
        </ContextualPanel>
      ) : null}
      <MaxWidth>
        <div
          title={document.author.address}
          css={`
            padding: 12px 8px 0 8px;
          `}
        >
          <span>
            <b>{document.author.shortName}</b>
          </span>{" "}
          {author && author.address === document.author.address ? (
            <NavButton
              css={`
                font-feature-settings: "tnum";
                font-variant-numeric: tabular-nums;
              `}
              accent={"gamma"}
              ref={buttonRef}
              onClick={() => {
                setOpenPanel((prev) => (prev === "none" ? "options" : "none"));
              }}
            >
              {`${fromDate(new Date(document.timestamp / 1000))}`}
            </NavButton>
          ) : (
            <span
              css={`
                font-feature-settings: "tnum";
                font-variant-numeric: tabular-nums;
              `}
            >{`${fromDate(new Date(document.timestamp / 1000))}`}</span>
          )}
        </div>
        <div
          css={`
            padding: 4px 8px 0 8px;
          `}
        >
          {document.content}
        </div>
      </MaxWidth>
    </div>
  );
};

// This declares which data Message wants from Relay.
// document will be fed in as a prop
export default createFragmentContainer(Message, {
  document: graphql`
    fragment Message_document on Document {
      __typename
      ... on ES4Document {
        ...MessageEditor_document
        id
        content
        path
        timestamp
        workspace {
          address
        }
        author {
          address
          shortName
        }
      }
    }
  `,
});
