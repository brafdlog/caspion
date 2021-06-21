import { ipcMain, dialog, ipcRenderer } from 'electron';
import { checkForUpdate, downloadUpdate, quitAndInstall } from './updater';

const functions = {
  showSaveDialog: async () => {
    const dir = await dialog.showSaveDialog({});
    return dir.filePath;
  },
  checkForUpdate,
  downloadUpdate,
  quitAndInstall
};
type Functions = typeof functions;

export const ipcHandlers = Object.keys(functions).reduce((acc, funcName) => {
  acc[funcName] = () => ipcRenderer.invoke(funcName);
  return acc;
}, {} as Functions);

export const registerHandlers = () => {
  Object.keys(functions).forEach((funcName) => {
    ipcMain.handle(funcName, functions[funcName]);
  });
};
