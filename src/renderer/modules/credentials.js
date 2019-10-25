/*
Copied from https://github.com/eshaham/israeli-ynab-updater/blob/b207a6b2468fa2904412fe9563b8f65ac1e4cfaa/src/helpers/credentials.js
*/

import { encrypt, decrypt } from './crypto';

export function encryptCredentials(credentials) {
  const encrypted = {};
  Object.keys(credentials).forEach((field) => {
    encrypted[field] = encrypt(credentials[field]);
  });
  return encrypted;
}

export function decryptCredentials(credentials) {
  const decrypted = {};
  Object.keys(credentials).forEach((field) => {
    decrypted[field] = decrypt(credentials[field]);
  });
  return decrypted;
}
