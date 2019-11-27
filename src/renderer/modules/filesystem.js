import fs from 'fs';

export function f() {
  return 'f';
}

export function readFileIfExist(filename) {
  try {
    return fs.readFileSync(filename).toString();
  } catch (err) {
    if (err.code === 'ENOENT') {
      return '';
    }
    throw err;
  }
}
