import React, { useContext } from "react";
import { createFragmentContainer, RelayProp } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { WorkspaceMessages_workspace } from "./__generated__/WorkspaceMessages_workspace.graphql";
import Message from "./Message";
import { css } from "styled-components/macro";
import MaxWidth from "./MaxWidth";
import { LobbyContext } from "./util/lobby-context";

type WorkspaceMessagesProps = {
  workspace: WorkspaceMessages_workspace;
  relay: RelayProp;
  setIsWorkspaceDirty: (isDirty: boolean) => void;
};

const WorkspaceMessages: React.FC<WorkspaceMessagesProps> = ({
  workspace,
  setIsWorkspaceDirty,
}) => {
  const { statusBarHeight } = useContext(LobbyContext);

  // Partition the documents by day (local)
  const docsByDate = workspace.documents.reduce((acc, doc) => {
    if (doc.__typename !== "ES4Document") {
      return acc;
    }

    const docDate = new Date(doc.timestamp / 1000);
    const docDateString = docDate.toDateString();
    const accDateCollection = acc[docDateString] || [];

    return {
      ...acc,
      [docDateString]: [...accDateCollection, doc],
    };
  }, {} as Record<string, WorkspaceMessages_workspace["documents"][0][]>);

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
                top: ${statusBarHeight}px;
                z-index: 0;
                background: ${(props) => props.theme.colours.bg};
                border-bottom: 1px solid
                  ${(props) => props.theme.colours.bgHint};
                padding: 12px 8px;
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
                if (doc.__typename !== "ES4Document") {
                  return null;
                }

                return (
                  <>
                    <Message
                      setIsWorkspaceDirty={setIsWorkspaceDirty}
                      key={doc.id}
                      document={doc}
                    />
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
                  </>
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
export default createFragmentContainer(WorkspaceMessages, {
  workspace: graphql`
    fragment WorkspaceMessages_workspace on Workspace {
      address
      documents(sortedBy: NEWEST, pathPrefixes: ["/lobby"]) {
        __typename
        ... on ES4Document {
          id
          timestamp
          ...Message_document
        }
      }
    }
  `,
});
