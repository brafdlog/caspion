/* eslint-disable no-use-before-define */
/*
Copied from https://github.com/eshaham/israeli-ynab-updater/blob/b207a6b2468fa2904412fe9563b8f65ac1e4cfaa/src/helpers/credentials.js
*/

import { randomHex, encrypt, decrypt } from './crypto';
import { saveIntoAccount, getFromAccount } from './keytar.service';

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
  const resultObj = { ...obj };
  const propertyJSON = JSON.stringify(resultObj[property]);
  const encryptedJSON = await encrypt(propertyJSON);
  const account = randomHex();
  await saveIntoAccount(account, encryptedJSON);
  resultObj[property] = account;
  return resultObj;
}

export async function decryptProperty(obj, property) {
  const resultObj = { ...obj };
  const account = resultObj[property];
  const encryptedJSON = await getFromAccount(account);
  const propertyJSON = await decrypt(encryptedJSON);
  resultObj[property] = JSON.parse(propertyJSON);
  return resultObj;
}
