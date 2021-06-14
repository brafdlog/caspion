import { ipcMain, dialog, ipcRenderer } from 'electron';
import { checkForUpdate, downloadUpdate, quitAndInstall } from '../updater';

export const SelectDirHandler = {
  name: 'SELECT_DIRECTORY_FOLDER',
  async handler() {
    const dir = await dialog.showSaveDialog({});

    return dir.filePath;
  },
  invoke() {
    return ipcRenderer.invoke(this.name);
  },
};

export const checkForUpdateHandler = {
  name: 'CHECK_FOR_UPDATE',
  async handler() {
    return checkForUpdate();
  },
  invoke() {
    return ipcRenderer.invoke(this.name);
  }
};

export const downloadUpdateHandler = {
  name: 'DOWNLOAD_UPDATE',
  async handler() {
    return downloadUpdate();
  },
  invoke() {
    return ipcRenderer.invoke(this.name);
  }
};

export const quitAndInstallHandler = {
  name: 'QUIT_AND_INSTALL',
  async handler() {
    return quitAndInstall();
  },
  invoke() {
    return ipcRenderer.invoke(this.name);
  }
};

export default function initialize() {
  ipcMain.handle(SelectDirHandler.name, SelectDirHandler.handler);
  ipcMain.handle(checkForUpdateHandler.name, checkForUpdateHandler.handler);
  ipcMain.handle(downloadUpdateHandler.name, downloadUpdateHandler.handler);
  ipcMain.handle(quitAndInstallHandler.name, quitAndInstallHandler.handler);
}
