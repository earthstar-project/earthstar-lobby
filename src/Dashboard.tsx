import React from "react";
import { css } from "styled-components/macro";
import WorkspaceSummary from "./WorkspaceSummary";
import { useWorkspaces } from "react-earthstar";

const Dashboard = () => {
  const workspaces = useWorkspaces();

  return (
    <>
      {workspaces.length > 0 ? (
        <ul
          css={css`
            margin: 1em 0 0 0;
            padding: 0;
            animation-delay: 500ms;
          `}
        >
          {workspaces.map((ws) => {
            return (
              <div
                key={ws}
                css={css`
                  margin-bottom: 2em;
                `}
              >
                <WorkspaceSummary workspace={ws} />
              </div>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};

export default Dashboard;
