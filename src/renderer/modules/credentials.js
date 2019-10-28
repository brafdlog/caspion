/* eslint-disable no-use-before-define */
/*
Copied from https://github.com/eshaham/israeli-ynab-updater/blob/b207a6b2468fa2904412fe9563b8f65ac1e4cfaa/src/helpers/credentials.js
*/

import { encrypt, decrypt } from './crypto';

function isObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

function encryptValue(val) {
  if (isObject(val)) {
    return encryptObject(val);
  }
  if (Array.isArray(val)) {
    return encryptArray(val);
  }
  return encrypt(val);
}

function encryptArray(arr) {
  return arr.map((item) => encryptValue(item));
}

export function encryptObject(obj) {
  const encrypted = {};
  Object.keys(obj).forEach((field) => {
    encrypted[field] = encryptValue(obj[field]);
  });
  return encrypted;
}

export function decryptObject(credentials) {
  const decrypted = {};
  Object.keys(credentials).forEach((field) => {
    decrypted[field] = decrypt(credentials[field]);
  });
  return decrypted;
}
