import { ipcMain, dialog, ipcRenderer } from 'electron';
import { checkForUpdate, downloadUpdate, quitAndInstall } from './updater';
import { getConfigHandler, updateConfigHandler } from './configHandlers';
import { configFilePath } from '@/app-globals';
import { getConfig } from '@/backend/configManager/configManager';
import { scrapeAndUpdateOutputVendors } from '@/backend';
import { BudgetTrackingEventEmitter } from '@/backend/eventEmitters/EventEmitter';

const functions = {
  showSaveDialog: async () => {
    const dir = await dialog.showSaveDialog({});
    return dir.filePath;
  },
  checkForUpdate,
  downloadUpdate,
  quitAndInstall,
  getConfig: getConfigHandler,
  updateConfig: updateConfigHandler
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
  ipcMain.on('scrape', async (event, _args) => {
    const config = await getConfig(configFilePath);
    const eventSubscriber = new BudgetTrackingEventEmitter();
    scrapeAndUpdateOutputVendors(config, eventSubscriber);
    eventSubscriber.onAny((eventName, eventData) => {
      event.reply('scrapingProgress', JSON.stringify({ eventName, eventData }));
    });
  });
};
