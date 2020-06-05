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

export function readFileToObject(filename, defaultObject) {
  const content = readFileIfExist(filename);
  if (content && content.trim()) {
    return JSON.parse(content);
  }
  return defaultObject;
}

export function writeFile(filename, content) {
  fs.writeFileSync(filename, content);
}
