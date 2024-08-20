import electronUpdater from 'electron-updater';
import logger from '../logging/logger';

const { autoUpdater } = electronUpdater;

export interface UpdateInfo {
  version: string
}

autoUpdater.logger = logger;
autoUpdater.autoDownload = false;

export const checkForUpdate = async () => new Promise<UpdateInfo | false>((resolve, reject) => {
  autoUpdater.once('error', reject);
  autoUpdater.once('update-available', (info: UpdateInfo) => resolve(info));
  autoUpdater.once('update-not-available', () => resolve(false));
  autoUpdater.checkForUpdates();
});

export const downloadUpdate = async () => new Promise<electronUpdater.UpdateDownloadedEvent>((resolve, reject) => {
  autoUpdater.once('error', reject);
  autoUpdater.once('update-downloaded', resolve);
  autoUpdater.downloadUpdate();
});

export const quitAndInstall = () => setImmediate(() => autoUpdater.quitAndInstall());
