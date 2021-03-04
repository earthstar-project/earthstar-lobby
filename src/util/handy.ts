import { AuthorKeypair, ValidatorEs4, Document } from "earthstar";

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

const pathTimestampRegex = /(\d*)(?:\.txt)/

export function getLobbyDocPublishedTimestamp(doc: Document): number {
  const result = pathTimestampRegex.exec(doc.path);
  
  if (result === null) {
    return 0
  }
  
  return parseInt(result[0])
}

export function sortByPublished(docA: Document, docB: Document) {
  const aTimestamp = getLobbyDocPublishedTimestamp(docA)
  const bTimestamp = getLobbyDocPublishedTimestamp(docB);
  
  return aTimestamp > bTimestamp ? -1 : 1
}

export function notify(title: string, body: string) {
  if (!("Notification" in window)) {
    return;
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    new Notification(title, {body});
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        new Notification(title, {body});
      }
    });
  }
}

