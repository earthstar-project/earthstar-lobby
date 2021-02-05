import React from "react";
import Message from "./Message";
import { css } from "styled-components/macro";
import MaxWidth from "./MaxWidth";
import { useDocuments } from "react-earthstar";
import { Document } from "earthstar";

type WorkspaceMessagesProps = {
  workspace: string;
};

const WorkspaceMessages: React.FC<WorkspaceMessagesProps> = ({ workspace }) => {
  const documents = useDocuments({ pathPrefix: "/lobby/" }, workspace);

  // Partition the documents by day (local)
  const docsByDate = documents
    .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
    .reduce((acc, doc) => {
      const docDate = new Date(doc.timestamp / 1000);
      const docDateString = docDate.toDateString();
      const accDateCollection = acc[docDateString] || [];

      return {
        ...acc,
        [docDateString]: [...accDateCollection, doc],
      };
    }, {} as Record<string, Document[]>);

  return (
    <div>
      {Object.keys(docsByDate).map((key) => {
        const date = new Date(Date.parse(key));
        const title = date.toLocaleDateString(["en-en"], {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        const documents = docsByDate[key];

        return (
          <section key={key}>
            <div
              css={css`
                position: sticky;
                z-index: 0;
                background: ${(props) => props.theme.colours.bg};
                border-bottom: 1px solid
                  ${(props) => props.theme.colours.bgHint};
                padding: 12px 0;
                display: flex;
                justify-content: center;
                box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.04);
              `}
            >
              <div
                css={css`
                  color: ${(props) => props.theme.colours.fg};
                `}
              >
                <b>{title}</b>
              </div>
            </div>
            <ol
              css={css`
                padding: 8px 0;
                margin: 0;
              `}
            >
              {documents.map((doc, i) => {
                return (
                  <React.Fragment key={doc.path}>
                    <Message document={doc} />
                    {i < documents.length - 1 ? (
                      <MaxWidth>
                        <hr
                          css={css`
                            border: none;
                            border-top: 1px solid
                              ${(props) => props.theme.colours.bgHint};
                          `}
                        />
                      </MaxWidth>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
};

// This declares which data WorkspaceMessages wants from Relay.
// workspace will be fed in as a prop
export default WorkspaceMessages;
