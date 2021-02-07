import { app, remote } from 'electron';
import { mkdirSync } from 'fs';
import path from 'path';

const App = app || remote.app;

if (process.env.NODE_ENV !== 'production') {
  const localUserData = path.resolve('userData');
  mkdirSync(localUserData, { recursive: true });
  App.setPath('userData', localUserData);
}

export const userDataPath = App.getPath('userData');
export const configFilePath = path.resolve(userDataPath, 'config.encrypt');
