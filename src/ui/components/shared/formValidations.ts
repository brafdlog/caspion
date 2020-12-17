import os from 'os';
import path from 'path';

export function required(value) {
  return !!value || 'Required.';
}

export function positive(value: number) {
  return value > 0 || 'Must be grater than 0';
}

const windowsIllegalCharacters = ['<', '>', ':', '"', '|', '?', '*'];
const windowsIllegalRegex = new RegExp(`[${windowsIllegalCharacters.join()}]`, '');

export function legalPath(value: string) {
  if (os.platform() !== 'win32') return true;

  const inputPath = path.isAbsolute(value) ? value.split(/[/\\]/).splice(1).join('/') : value;
  return inputPath.search(windowsIllegalRegex) < 0
    || `Character ${inputPath[inputPath.search(windowsIllegalRegex)]} is not allowed`;
}
