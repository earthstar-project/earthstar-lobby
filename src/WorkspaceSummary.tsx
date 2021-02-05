import React, { useContext } from "react";
import { css } from "styled-components/macro";
import { WindupChildren } from "windups";
import MaxWidth from "./MaxWidth";
import NavButton from "./NavButton";
import AuthorIdenticon from "./AuthorIdenticon";
import { LobbyContext } from "./util/lobby-context";

import {
  useDocuments,
  WorkspaceLabel,
  useStorage,
  AuthorLabel,
} from "react-earthstar";

type WorkspaceSummaryProps = {
  workspace: string;
};

const WorkspaceSummary: React.FC<WorkspaceSummaryProps> = ({ workspace }) => {
  const { appStateDispatch } = useContext(LobbyContext);

  const firstThreePosts = useDocuments({ pathPrefix: "/lobby/" }, workspace)
    .sort((aDoc, bDoc) => (aDoc.timestamp > bDoc.timestamp ? -1 : 0))
    .slice(0, 3);

  const storage = useStorage(workspace);

  return (
    <>
      <MaxWidth>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-top: 0.7em;
          `}
        >
          <div>
            <NavButton
              onClick={() => {
                appStateDispatch({
                  type: "OPEN_WORKSPACE",
                  address: workspace,
                });
              }}
              accent={"alpha"}
            >
              <WorkspaceLabel address={workspace} />
            </NavButton>
            <WindupChildren>
              <span
                css={css`
                  color: ${(props) => props.theme.colours.fgHint};
                `}
              >
                {` ${storage?.authors().length} members`}
              </span>
            </WindupChildren>
          </div>
        </div>
        <div
          css={css`
            margin-top: 0.4em;
          `}
        >
          {firstThreePosts.map((post) => {
            return (
              <div
                key={post.path}
                css={css`
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                  line-height: 1.5;
                `}
              >
                <span
                  css={css`
                    color: ${(props) => props.theme.colours.fgHint};
                  `}
                >
                  <AuthorLabel address={post.author} />{" "}
                  <AuthorIdenticon address={post.author} /> {post.content}
                </span>
              </div>
            );
          })}
        </div>
      </MaxWidth>
    </>
  );
};

export default WorkspaceSummary;
