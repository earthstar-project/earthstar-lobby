import { AuthorKeypair, ValidatorEs4 } from "earthstar";

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
