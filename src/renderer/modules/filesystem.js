import fs from 'fs';

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

export function writeFile(filename, content) {
  fs.writeFileSync(filename, content);
}
