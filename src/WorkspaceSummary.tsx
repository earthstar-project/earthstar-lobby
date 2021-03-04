import React, { useContext } from "react";
import { css } from "styled-components/macro";
import MaxWidth from "./MaxWidth";
import NavButton from "./NavButton";
import AuthorIdenticon from "./AuthorIdenticon";
import { LobbyContext } from "./util/lobby-context";

import { useDocuments, WorkspaceLabel, AuthorLabel } from "react-earthstar";
import { sortByPublished } from "./util/handy";
import { useWorkspaceNotifications } from "./util/hooks";

type WorkspaceSummaryProps = {
  workspace: string;
};

const WorkspaceSummary: React.FC<WorkspaceSummaryProps> = ({ workspace }) => {
  const { appStateDispatch } = useContext(LobbyContext);

  const firstThreePosts = useDocuments(
    { pathStartsWith: "/lobby/", contentLengthGt: 0 },
    workspace
  )
    .sort(sortByPublished)
    .slice(0, 3);

  useWorkspaceNotifications(workspace);

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
