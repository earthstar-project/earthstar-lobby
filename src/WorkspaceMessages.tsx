import React from "react";
import Message from "./Message";
import { css } from "styled-components/macro";
import MaxWidth from "./MaxWidth";
import { useDocuments } from "react-earthstar";
import { Document } from "earthstar";
import { sortByPublished, getLobbyDocPublishedTimestamp } from "./util/handy";
import Button from "./Button";

type WorkspaceMessagesProps = {
  workspace: string;
};

const WorkspaceMessages: React.FC<WorkspaceMessagesProps> = ({ workspace }) => {
  const [loaded, setLoaded] = React.useState(20);

  const documents = useDocuments(
    { pathStartsWith: "/lobby/", contentLengthGt: 0 },
    workspace
  );

  // Partition the documents by day (local)
  const docsByDate = React.useMemo(() => {
    return documents

      .sort(sortByPublished)
      .slice(0, loaded)
      .reduce((acc, doc) => {
        const docDate = new Date(getLobbyDocPublishedTimestamp(doc));
        const docDateString = docDate.toDateString();
        const accDateCollection = acc[docDateString] || [];

        return {
          ...acc,
          [docDateString]: [...accDateCollection, doc],
        };
      }, {} as Record<string, Document[]>);
  }, [documents, loaded]);

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
            <MaxWidth>
              <div
                css={css`
                  position: sticky;
                  z-index: 0;
                  background: ${(props) => props.theme.colours.bg};
                  border-bottom: 1px solid
                    ${(props) => props.theme.colours.bgHint};
                  padding: 12px 0;
                `}
              >
                <div
                  css={css`
                    color: ${(props) => props.theme.colours.fgHint};
                  `}
                >
                  {title}
                </div>
              </div>
            </MaxWidth>
            <ol
              css={css`
                padding: 8px 0;
                margin: 0;
              `}
            >
              {documents.map((doc) => {
                return <Message document={doc} key={doc.path} />;
              })}
            </ol>
          </section>
        );
      })}
      {loaded < documents.length && (
        <MaxWidth
          css={`
            margin-bottom: 2em;
          `}
        >
          <Button
            onClick={() => {
              setLoaded((prev) => prev + 20);
            }}
          >
            {"Show older messages"}
          </Button>
        </MaxWidth>
      )}
    </div>
  );
};

// This declares which data WorkspaceMessages wants from Relay.
// workspace will be fed in as a prop
export default WorkspaceMessages;
