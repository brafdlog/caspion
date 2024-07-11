import logger from '../logging/logger';

export type UpdateInfo = {
  version: string;
};

const isRenderer = process && process.type === 'renderer';
// There is a typing issue with 'electron-updater' I can't solve
const autoUpdater = isRenderer ? {} : require('electron-updater').autoUpdater; // eslint-disable-line

autoUpdater.logger = logger;
autoUpdater.autoDownload = false;

export const checkForUpdate = async () =>
  new Promise<UpdateInfo | false>((resolve, reject) => {
    autoUpdater.once('error', reject);
    autoUpdater.once('update-available', (info: UpdateInfo) => resolve(info));
    autoUpdater.once('update-not-available', () => resolve(false));
    autoUpdater.checkForUpdates();
  });

export const downloadUpdate = async () =>
  new Promise<any>((resolve, reject) => {
    autoUpdater.once('error', reject);
    autoUpdater.once('update-downloaded', resolve);
    autoUpdater.downloadUpdate();
  });

export const quitAndInstall = () => {
  setImmediate(() => autoUpdater.quitAndInstall());
};
