import { mkdirSync } from 'fs';
import path from 'path';

export const initDevFolder = (app: Electron.App) => {
  if (process.env.NODE_ENV !== 'production') {
    const localUserData = path.resolve('userData');
    mkdirSync(localUserData, { recursive: true });
    app.setPath('userData', localUserData);
  }
};

export const userDataPath = (app: Electron.App) => app.getPath('userData');
export const configFilePath = (app: Electron.App) => path.resolve(userDataPath(app), 'config.encrypt');
