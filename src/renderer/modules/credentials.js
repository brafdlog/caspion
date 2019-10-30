/* eslint-disable no-use-before-define */
/*
Copied from https://github.com/eshaham/israeli-ynab-updater/blob/b207a6b2468fa2904412fe9563b8f65ac1e4cfaa/src/helpers/credentials.js
*/

import { encrypt, decrypt } from './crypto';

export const defaultEncryptProperty = 'encrypted';

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

function decryptValue(val) {
  if (isObject(val)) {
    return decryptObject(val);
  }
  if (Array.isArray(val)) {
    return decryptArray(val);
  }
  return decrypt(val);
}

function encryptArray(arr) {
  return arr.map((item) => encryptValue(item));
}

function decryptArray(arr) {
  return arr.map((item) => decryptValue(item));
}

export function encryptObject(obj) {
  const encrypted = {};
  Object.keys(obj).forEach((key) => {
    encrypted[key] = encryptValue(obj[key]);
  });
  return encrypted;
}

export function decryptObject(obj) {
  const decrypted = {};
  Object.keys(obj).forEach((key) => {
    decrypted[key] = decryptValue(obj[key]);
  });
  return decrypted;
}

export function encryptProperty(obj, property) {
  const encrypted = obj;
  if (encrypted[property]) {
    encrypted[property] = encryptObject(encrypted[property]);
  }
  return encrypted;
}

export function decryptProperty(obj, property) {
  const decrypted = obj;
  if (decrypted[property]) {
    decrypted[property] = decryptObject(decrypted[property]);
  }
  return decrypted;
}
