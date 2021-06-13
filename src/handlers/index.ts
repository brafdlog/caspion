import { ipcMain, dialog, ipcRenderer } from 'electron';

export default function initialize() {
  ipcMain.handle(SelectDirHandler.name, SelectDirHandler.handler);
}

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
