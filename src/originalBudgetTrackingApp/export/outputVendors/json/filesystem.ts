import { promises as fs } from 'fs';

export const readFileIfExist = async (filename: string) => {
  try {
    return fs.readFile(filename, { encoding: 'utf8' });
  } catch (err) {
    if (err.code === 'ENOENT') {
      return '';
    }
    throw err;
  }
};

export const parseFile = async <T>(filename: string, defaultObject: T) => {
  const content = await readFileIfExist(filename);
  if (content && content.trim()) {
    return JSON.parse(content) as T;
  }
  return defaultObject;
};

export const writeFile = async (filename: string, content: string) => {
  await fs.writeFile(filename, content);
};
