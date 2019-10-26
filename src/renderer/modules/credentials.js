/*
Copied from https://github.com/eshaham/israeli-ynab-updater/blob/b207a6b2468fa2904412fe9563b8f65ac1e4cfaa/src/helpers/credentials.js
*/

import { encrypt, decrypt } from './crypto';

function isObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

export function encryptValues(credentials) {
  const encrypted = {};
  Object.keys(credentials).forEach((field) => {
    if (isObject(credentials[field])) {
      encrypted[field] = encryptValues(credentials[field]);
    } else {
      encrypted[field] = encrypt(credentials[field]);
    }
  });
  return encrypted;
}

export function decryptValues(credentials) {
  const decrypted = {};
  Object.keys(credentials).forEach((field) => {
    decrypted[field] = decrypt(credentials[field]);
  });
  return decrypted;
}
