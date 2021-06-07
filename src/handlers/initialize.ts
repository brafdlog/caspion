import { ipcMain } from 'electron';
import { SelectDirHandler } from './select-dir';

export enum IpcMainHandlers {
  SELECT_DIR = 'SELECT_DIR',
}

export default function initialize() {
  ipcMain.handle(IpcMainHandlers.SELECT_DIR, SelectDirHandler.handler);
}
