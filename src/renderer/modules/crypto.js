/*
Copied from https://github.com/eshaham/israeli-ynab-updater/blob/b207a6b2468fa2904412fe9563b8f65ac1e4cfaa/src/helpers/crypto.js
*/

import crypto from 'crypto';
import SALT from './salt';

const ALGORITHM = 'aes-256-ctr';

export async function encrypt(text) {
  const SALT = await SALT() getSALT(true);
  const cipher = crypto.createCipher(ALGORITHM, SALT);
  const crypted = cipher.update(text, 'utf8', 'hex');
  return crypted + cipher.final('hex');
}

export async function decrypt(text) {
  const SALT = await getSALT(false);
  const decipher = crypto.createDecipher(ALGORITHM, SALT);
  const decrypted = decipher.update(text, 'hex', 'utf8');
  return decrypted + decipher.final('utf8');
}
