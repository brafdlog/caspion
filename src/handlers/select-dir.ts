import { dialog, ipcRenderer } from 'electron';
import { IpcMainHandlers } from './initialize';

export const SelectDirHandler = {
  handler: async () => {
    const dir = await dialog.showOpenDialog({
      properties: ['openDirectory'],
      buttonLabel: 'Select',
    });
    return dir.filePaths[0];
  },
  invoke: () => ipcRenderer.invoke(IpcMainHandlers.SELECT_DIR),
};
