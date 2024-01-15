/*
Copied from https://github.com/eshaham/israeli-ynab-updater/blob/b207a6b2468fa2904412fe9563b8f65ac1e4cfaa/src/helpers/crypto.js
*/

import crypto from 'crypto';
import SALT from './salt';

const ALGORITHM = 'aes-256-ctr';

export function randomHex(characters = 16) {
  return crypto.randomBytes(characters).toString('hex');
}

export async function encrypt(text: string) {
  const salt = await SALT(randomHex());

  const cipher = crypto.createCipher(ALGORITHM, salt);
  const crypted = cipher.update(text, 'utf8', 'hex');
  return crypted + cipher.final('hex');
}

export async function decrypt(text: string) {
  const salt = await SALT();
  const decipher = crypto.createDecipher(ALGORITHM, salt);
  const decrypted = decipher.update(text, 'hex', 'utf8');
  return decrypted + decipher.final('utf8');
}
