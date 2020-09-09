import { AuthorKeypair, ValidatorEs4 } from "earthstar";
import { SyncMutationResponse } from "../mutations/__generated__/SyncMutation.graphql";

export function isKeypair(val: any): val is AuthorKeypair {
  if (!val.address || !val.secret) {
    return false;
  }
  const isValid = ValidatorEs4._checkAuthorIsValid(val.address);

  if (!isValid) {
    console.error(isValid);
    return false;
  }

  return true;
}

const authorNameRegex = /@(.*)\./;

export function getAuthorShortname(address: string): string {
  const result = authorNameRegex.exec(address);

  if (result) {
    return result[1];
  }

  return address;
}

const authorHashRegex = /@.*\.(.*)/;

export function getAuthorHash(address: string): string {
  const result = authorHashRegex.exec(address);

  if (result) {
    return result[1];
  }

  return address;
}

const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

export function hexToRgb(hex: string) {
  var result = hexRegex.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function getSyncSummaryMessage(res: SyncMutationResponse): string {
  if (res.syncWithPubs.__typename === "WorkspaceNotFoundError") {
    return `The workspace "${res.syncWithPubs.address}" could not be found (?!)`;
  }

  if (res.syncWithPubs.__typename === "WorkspaceNotValidError") {
    return `The workspace wasn't valid: ${res.syncWithPubs.reason}`;
  }

  if (res.syncWithPubs.__typename !== "SyncReport") {
    return "Syncing went horribly wrong (!!!)";
  }

  if (
    res.syncWithPubs.pubSyncResults.every(
      (result) => result.__typename === "SyncError"
    )
  ) {
    return "None of the pubs could be reached!";
  }

  if (
    res.syncWithPubs.pubSyncResults
      .filter((result) => result.__typename !== "SyncError")
      .every((result) => result.__typename === "DetailedSyncSuccess")
  ) {
    const pushedDocs = res.syncWithPubs.pubSyncResults.flatMap((syncResult) => {
      if (!syncResult.pushed) {
        return [];
      }

      return syncResult.pushed.documents
        .filter(
          (ingestion) => ingestion.__typename === "AcceptedDocumentIngestion"
        )
        .map((ingestion) => ingestion.document?.id)
        .filter((id) => !!id);
    });

    const pulledDocs = res.syncWithPubs.pubSyncResults.flatMap((syncResult) => {
      if (!syncResult.pulled) {
        return [];
      }

      return syncResult.pulled.documents
        .filter(
          (ingestion) => ingestion.__typename === "AcceptedDocumentIngestion"
        )
        .map((ingestion) => ingestion.document?.id)
        .filter((id) => !!id);
    });

    const pushedCount = Array.from(new Set(pushedDocs)).length;
    const pulledCount = Array.from(new Set(pulledDocs)).length;

    if (pushedCount === 0 && pulledCount === 0) {
      return "Nothing new was synced.";
    }

    if (pushedCount === 0 && pulledCount !== 0) {
      return `Pulled ${pulledCount} documents.`;
    }

    if (pushedCount !== 0 && pulledCount === 0) {
      return `Pushed ${pulledCount} documents.`;
    }

    return `Pushed ${pushedCount}, pulled ${pulledCount}.`;
  }

  const syncedWithPubsNumber = res.syncWithPubs.pubSyncResults.filter(
    (result) => result.__typename !== "SyncError"
  ).length;

  return `Synced with ${syncedWithPubsNumber} pubs.`;
}
