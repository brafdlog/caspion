/* eslint-disable no-bitwise */

export default function (str) {
  if (str.length === 0) return 0;

  let hash = 0;
  let i;
  let chr;
  for (i = 0; i < this.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
