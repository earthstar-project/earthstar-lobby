import React, { useState, useRef, useEffect } from "react";
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
import AuthorIdenticon from "./AuthorIdenticon";
import { getAuthorShortname } from "./util/handy";
import { css } from "styled-components/macro";
import SyncMutation from "./mutations/SyncMutation";
import { PUB_URL } from "./constants";
import Linkify from "react-linkify";

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

  // Sync the deletion of the post after the deleteAfter has passed
  useEffect(() => {
    if (document.deleteAfter !== null) {
      const interval = setInterval(() => {
        if (document.deleteAfter && document.deleteAfter >= Date.now() * 1000) {
          SyncMutation.commit(relay.environment, {
            pubUrl: PUB_URL,
            workspace: document.workspace.address,
          });
        }
      }, 86400);

      return () => {
        clearInterval(interval);
      };
    }
  }, [document.deleteAfter, document.workspace.address, relay.environment]);

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
              deleteAfter: document.deleteAfter,
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
            align-items: baseline;
          `}
        >
          <span>
            <b
              css={css`
                color: ${(props) => props.theme.colours.fg};
              `}
            >
              {document.author.displayName || document.author.shortName}
            </b>{" "}
            <span
              css={css`
                color: ${(props) => props.theme.colours.fgHint};
              `}
            >
              {document.author.displayName
                ? getAuthorShortname(document.author.address)
                : ""}{" "}
            </span>
            <AuthorIdenticon address={document.author.address} />
          </span>{" "}
          <span
            css={css`
              color: ${(props) => props.theme.colours.fgHint};
              font-feature-settings: "tnum";
              font-variant-numeric: tabular-nums;
            `}
          >
            {author && author.address === document.author.address ? (
              <NavButton
                css={css`
                  color: ${(props) => props.theme.colours.fgHint};
                `}
                accent={"gamma"}
                ref={buttonRef}
                onClick={() => {
                  setOpenPanel((prev) =>
                    prev === "none" ? "options" : "none"
                  );
                }}
              >
                {`${fromDate(new Date(document.timestamp / 1000))}`}
              </NavButton>
            ) : (
              `${fromDate(new Date(document.timestamp / 1000))}`
            )}
          </span>
        </div>
        <div
          css={css`
            color: ${(props) => props.theme.colours.fg};
            padding: 4px 8px 0 8px;
            a {
              overflow-wrap: break-word;
              word-wrap: break-word;
              word-break: break-all;
              word-break: break-word;
              hyphens: auto;
              color: ${(props) => props.theme.colours.fgHint};
            }
          `}
        >
          <Linkify>{document.content}</Linkify>
        </div>
        {document.deleteAfter ? (
          <div
            css={css`
              font-size: 0.8em;
              padding: 4px 8px 0 8px;
              color: ${(props) => props.theme.colours.fgHint};
            `}
          >
            {`This message will disappear at ${fromDate(
              new Date(document.deleteAfter / 1000)
            )}.`}
          </div>
        ) : null}
      </MaxWidth>
    </div>
  );
};

// This declares which data Message wants from Relay.
// document will be fed in as a prop
export default createFragmentContainer(Message, {
  document: graphql`
    fragment Message_document on ES4Document {
      ...MessageEditor_document
      id
      content
      path
      timestamp
      deleteAfter
      workspace {
        address
      }
      author {
        address
        displayName
        shortName
      }
    }
  `,
});
