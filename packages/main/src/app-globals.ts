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

// Default export file paths in the user's Documents directory
export const documentsPath = App.getPath('documents');
export const defaultCsvPath = path.resolve(documentsPath, 'transaction.csv');
export const defaultJsonPath = path.resolve(documentsPath, 'transaction.json');
