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
