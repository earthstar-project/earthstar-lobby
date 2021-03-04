import React from "react";
import { css } from "styled-components/macro";
import WorkspaceSummary from "./WorkspaceSummary";
import { useStorages } from "react-earthstar";
import { IStorageAsync, Document } from "earthstar";
import { sortByPublished, getLobbyDocPublishedTimestamp } from "./util/handy";

function useStoragesSortedByNewest() {
  const [storages] = useStorages();

  const [sortedStorages, setSortedStorages] = React.useState<IStorageAsync[]>(
    []
  );

  React.useEffect(() => {
    let ignore = false;

    Promise.all(
      Object.values(storages).map((storage) => {
        return new Promise<{
          storage: IStorageAsync;
          latestDoc: Document | undefined;
        }>((resolve) => {
          storage.documents({ pathStartsWith: "/lobby/" }).then((lobbyDocs) => {
            const latestDoc = lobbyDocs.sort(sortByPublished).shift();

            resolve({ storage, latestDoc });
          });
        });
      })
    ).then((latestDocsAndStorages) => {
      const sortedStorages = latestDocsAndStorages
        .sort((aPair, bPair) => {
          if (!aPair.latestDoc) {
            return 1;
          }

          if (!bPair.latestDoc) {
            return -1;
          }

          return getLobbyDocPublishedTimestamp(aPair.latestDoc) >
            getLobbyDocPublishedTimestamp(bPair.latestDoc)
            ? -1
            : 1;
        })
        .map(({ storage }) => storage);
      if (!ignore) {
        setSortedStorages(sortedStorages);
      }
    });

    return () => {
      ignore = true;
    };
  }, [storages]);

  return sortedStorages;
}

const Dashboard = () => {
  const sortedStorages = useStoragesSortedByNewest();

  return (
    <>
      {sortedStorages.length > 0 ? (
        <ul
          css={css`
            margin: 1em 0 0 0;
            padding: 0;
            animation-delay: 500ms;
          `}
        >
          {sortedStorages.map((storage) => {
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
