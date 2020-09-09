import React from "react";
import { QueryRenderer, Environment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { css } from "styled-components/macro";

import StatusBar from "./NewStatusBar";
import AuthorStatusBit from "./AuthorStatusBit";
import DashboardStatusBit from "./DashboardStatusBit";
import WorkspaceSummary from "./WorkspaceSummary";
import WorkspacePersistor from "./WorkspacePersistor";

import { DashboardQuery } from "./__generated__/DashboardQuery.graphql";

type DashboardProps = {
  relayEnv: Environment;
};

const Dashboard = ({ relayEnv }: DashboardProps) => {
  return (
    <QueryRenderer<DashboardQuery>
      environment={relayEnv}
      query={graphql`
        query DashboardQuery {
          ...DashboardStatusBit_rootQuery
          workspaces {
            id
            ...WorkspaceSummary_workspace
            ...WorkspacePersistor_workspaces
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <div>{"Error!"}</div>;
        }

        if (!props) {
          return null;
        }

        return (
          <>
            <WorkspacePersistor workspaces={props.workspaces} />
            <StatusBar
              leftChildren={
                props.workspaces.length === 0 ? (
                  <div
                    css={css`
                      line-height: 1;
                    `}
                  >
                    {"⏳"}
                  </div>
                ) : (
                  <DashboardStatusBit rootQuery={props} />
                )
              }
              rightChildren={<AuthorStatusBit />}
            />
            {props.workspaces.length > 0 ? (
              <ul
                css={css`
                  margin: 1em 0 0 0;
                  padding: 0;
                  animation-delay: 500ms;
                `}
              >
                {props.workspaces.map((ws) => {
                  return (
                    <div
                      key={ws.id}
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
      }}
    />
  );
};

export default Dashboard;
