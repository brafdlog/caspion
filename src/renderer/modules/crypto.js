/*
Copied from https://github.com/eshaham/israeli-ynab-updater/blob/b207a6b2468fa2904412fe9563b8f65ac1e4cfaa/src/helpers/crypto.js
*/

import crypto from 'crypto';

const ALGORITHM = 'aes-256-ctr';
const SALT = '7cs+7Y(nxMFK';

export function encrypt(text) {
  const cipher = crypto.createCipher(ALGORITHM, SALT);
  const crypted = cipher.update(text, 'utf8', 'hex');
  return crypted + cipher.final('hex');
}

export function decrypt(text) {
  const decipher = crypto.createDecipher(ALGORITHM, SALT);
  const decrypted = decipher.update(text, 'hex', 'utf8');
  return decrypted + decipher.final('utf8');
}
