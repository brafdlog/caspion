import { app, remote } from 'electron';
import path from 'path';

const App = app || remote.app;

export const userDataPath = App.getPath('userData');
export const configFilePath = path.resolve(userDataPath, 'config.encrypt');
