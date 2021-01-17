import { app, remote } from 'electron';
import path from 'path';

const App = app || remote.app;

if (process.env.NODE_ENV !== 'production') {
  App.setPath('userData', path.resolve('userData'));
}

export const userDataPath = App.getPath('userData');
export const configFilePath = path.resolve(userDataPath, 'config.encrypt');
