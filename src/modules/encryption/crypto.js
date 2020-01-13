import crypto from 'crypto';

export default function randomHex(characters = 16) {
  return crypto.randomBytes(characters).toString('hex');
}
