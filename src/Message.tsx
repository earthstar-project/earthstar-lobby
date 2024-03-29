import React, { useState } from "react";
import MessageEditor from "./MessageEditor";
import { fromDate } from "dot-beat-time";
import NavButton from "./NavButton";
import ContextualPanel from "./ContextualPanel";
import "styled-components/macro";
import Button from "./Button";
import MaxWidth from "./MaxWidth";
import AuthorIdenticon from "./AuthorIdenticon";
import { css } from "styled-components/macro";
import Linkify from "react-linkify";
import { findEdgesAsync, writeEdgeAsync, deleteEdgeAsync } from 'earthstar-graph-db'

import { Document, isErr } from "earthstar";
import { useDocument, useCurrentAuthor, AuthorLabel, useStorage } from "react-earthstar";

type MessageProps = {
  document: Document;
};

type MessagePanel = "options" | "editing" | "none";

const Message: React.FC<MessageProps> = ({ document }) => {
  const [openPanel, setOpenPanel] = useState<MessagePanel>("none");
  const [currentAuthor] = useCurrentAuthor();

  // For pointing the contextual panel at the right place
  const [buttonNode, setButtonNode] = useState<HTMLElement | null>(null);

  // A function for editing/deleting the document
  const [, setDocument] = useDocument(document.path, document.workspace);
  const set = (message: string) => {
    setDocument(message, document.deleteAfter);
  };

  const [authorDisplayNameDoc] = useDocument(
    `/about/~${document.author}/displayName.txt`,
    document.workspace
  );
  
  const storage = useStorage(document.workspace);
  
  const [isStarred, setIsStarred] = React.useState(false);
  

    if (storage && currentAuthor) {
      findEdgesAsync(storage, {
        appName: 'LOBBY',
        source: document.path,
        dest: currentAuthor.address,
        kind: 'STARRED_BY',
        owner: currentAuthor.address
      }).then((edges) => {
        if (!isErr(edges) && edges.length > 0) {
          const [first] = edges;
          
          
          
          setIsStarred(first.content.length > 0);
        }
      })  
    }
 
  
  
  
  
  
  
  

  return (
    <div style={{ marginBottom: 24 }}>
      {openPanel !== "none" ? (
        <ContextualPanel pointsToNode={buttonNode} accentColour={"gamma"}>
          {openPanel === "editing" ? (
            <MessageEditor
              cancelEditing={() => setOpenPanel("none")}
              document={document}
              updateMessage={(newMessage: string) => {
                set(newMessage);
                setOpenPanel("none");
              }}
            />
          ) : currentAuthor?.address === document.author ? (
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
          title={document.author}
          css={`
            padding: 12px 0 0 0;
            align-items: baseline;
            display: flex;
            justify-content: space-between;
          `}
        >
          <div>
          <span>
            <b
              css={css`
                color: ${(props) => props.theme.colours.fg};
                overflow-wrap: break-word;
              `}
            >
              {authorDisplayNameDoc?.content || (
                <AuthorLabel address={document.author} />
              )}
            </b>{" "}
            <span
              css={css`
                color: ${(props) => props.theme.colours.fgHint};
              `}
            >
              {authorDisplayNameDoc ? (
                <AuthorLabel address={document.author} />
              ) : (
                ""
              )}{" "}
            </span>
            <AuthorIdenticon address={document.author} />
          </span>{" "}
          <span
            css={css`
              color: ${(props) => props.theme.colours.fgHint};
              font-feature-settings: "tnum";
              font-variant-numeric: tabular-nums;
            `}
          >
            {currentAuthor?.address === document.author ? (
              <NavButton
                css={css`
                  color: ${(props) => props.theme.colours.fgHint};
                `}
                accent={"gamma"}
                ref={(inst) => setButtonNode(inst)}
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
          { currentAuthor && storage ? <button css={css`appearance: none; background: none; border: none; padding: 0; font-size: 1.1em; color: ${(props) => props.theme.colours.fgHint};`} onClick={() => {
            if (isStarred) {
              deleteEdgeAsync(storage, currentAuthor, {
                appName: 'LOBBY',
                source: document.path,
                dest: currentAuthor.address,
                kind: 'STARRED_BY',
                owner: currentAuthor.address
              })
            } else {
              writeEdgeAsync(storage, currentAuthor, {
                appName: 'LOBBY',
                source: document.path,
                dest: currentAuthor.address,
                kind: 'STARRED_BY',
                owner: currentAuthor.address
              })
            }
            
            setIsStarred(prev => !prev)
          }}>{isStarred ? '★':  '☆'}</button> : null}
        </div>
        <div
          css={css`
            color: ${(props) => props.theme.colours.fg};
            padding: 4px 0 0 0;
            overflow-wrap: break-word;
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

export default Message;
