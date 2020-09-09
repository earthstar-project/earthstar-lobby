import React from "react";
import { QueryRenderer, Environment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { css } from "styled-components/macro";

import StatusBar from "./NewStatusBar";
import AuthorStatusBit from "./AuthorStatusBit";
import DashboardStatusBit from "./DashboardStatusBit";
import WorkspaceSummary from "./WorkspaceSummary";

import { DashboardQuery } from "./__generated__/DashboardQuery.graphql";

type DashboardProps = {
  relayEnv: Environment;
};

const Dashboard = ({ relayEnv }: DashboardProps) => {
  return (
    <>
      <QueryRenderer<DashboardQuery>
        environment={relayEnv}
        query={graphql`
          query DashboardQuery {
            ...DashboardStatusBit_rootQuery
            workspaces {
              id
              ...WorkspaceSummary_workspace
            }
          }
        `}
        variables={{}}
        render={({ error, props }) => {
          if (error) {
            return <div>{"Error!"}</div>;
          }

          if (!props) {
            return <div>{"Initialising..."}</div>;
          }

          return (
            <>
              <StatusBar
                leftChildren={<DashboardStatusBit rootQuery={props} />}
                rightChildren={<AuthorStatusBit />}
              />
              <ul
                css={css`
                  margin: 1em 0 0 0;
                  padding: 0;
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
            </>
          );
        }}
      />
    </>
  );
};

export default Dashboard;
