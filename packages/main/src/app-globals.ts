import electron from 'electron';
import { mkdirSync } from 'fs';
import path from 'path';

export const App: Electron.App = electron.app;

if (import.meta.env.MODE !== 'production') {
  const localUserData = path.resolve('userData');
  mkdirSync(localUserData, { recursive: true });
  App.setPath('userData', localUserData);
}

export const userDataPath = App.getPath('userData');
export const configFilePath = path.resolve(userDataPath, 'config.encrypt');

function getDocumentsPath(): string {
  try {
    return App.getPath('documents');
  } catch {
    return userDataPath;
  }
}

export const defaultCsvPath = path.resolve(getDocumentsPath(), 'transaction.csv');
export const defaultJsonPath = path.resolve(getDocumentsPath(), 'transaction.json');
