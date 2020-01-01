/* eslint-disable no-use-before-define */
/*
Copied from https://github.com/eshaham/israeli-ynab-updater/blob/b207a6b2468fa2904412fe9563b8f65ac1e4cfaa/src/helpers/credentials.js
*/

import { encrypt, decrypt } from './crypto';

export const defaultEncryptProperty = 'encrypted';

function isObject(obj) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}

async function encryptValue(val) {
  if (isObject(val)) {
    return encryptObject(val);
  }
  if (Array.isArray(val)) {
    return encryptArray(val);
  }
  return encrypt(val);
}

async function decryptValue(val) {
  if (isObject(val)) {
    return decryptObject(val);
  }
  if (Array.isArray(val)) {
    return decryptArray(val);
  }
  return decrypt(val);
}

async function encryptArray(arr) {
  return Promise.all(arr.map((item) => encryptValue(item)));
}

async function decryptArray(arr) {
  return Promise.all(arr.map((item) => decryptValue(item)));
}

export async function encryptObject(obj) {
  const encrypted = await Object.keys(obj).reduce(async (accPromise, key) => {
    const acc = await accPromise;
    acc[key] = await encryptValue(obj[key]);
    return acc;
  }, Promise.resolve({}));
  return encrypted;
}

export async function decryptObject(obj) {
  const decrypted = await Object.keys(obj).reduce(async (accPromise, key) => {
    const acc = await accPromise;
    acc[key] = await decryptValue(obj[key]);
    return acc;
  }, Promise.resolve({}));
  return decrypted;
}

export async function encryptProperty(obj, property) {
  const encrypted = { ...obj };
  if (encrypted[property]) {
    encrypted[property] = await encryptObject(encrypted[property]);
  }
  return encrypted;
}

export async function decryptProperty(obj, property) {
  const decrypted = { ...obj };
  if (decrypted[property]) {
    decrypted[property] = await decryptObject(decrypted[property]);
  }
  return decrypted;
}
