import React from "react";
import { css } from "styled-components/macro";
import WorkspaceSummary from "./WorkspaceSummary";
import { useStorages } from "react-earthstar";
import { IStorage } from "earthstar";

function getLatestDocument(storage: IStorage) {
  return storage
    .documents({ pathPrefix: "/lobby/" })
    .sort((aDoc, bDoc) => (aDoc.timestamp > bDoc.timestamp ? -1 : 1))
    .shift();
}

const Dashboard = () => {
  const [storages] = useStorages();

  return (
    <>
      {Object.values(storages).length > 0 ? (
        <ul
          css={css`
            margin: 1em 0 0 0;
            padding: 0;
            animation-delay: 500ms;
          `}
        >
          {Object.values(storages)
            .sort((aStorage, bStorage) => {
              const aLatest = getLatestDocument(aStorage);
              const bLatest = getLatestDocument(bStorage);

              if (!aLatest) {
                return 1;
              }

              if (!bLatest) {
                return -1;
              }

              return aLatest?.timestamp > bLatest?.timestamp ? -1 : 1;
            })
            .map((storage) => {
              return (
                <div
                  key={storage.workspace}
                  css={css`
                    margin-bottom: 2em;
                  `}
                >
                  <WorkspaceSummary workspace={storage.workspace} />
                </div>
              );
            })}
        </ul>
      ) : null}
    </>
  );
};

export default Dashboard;
