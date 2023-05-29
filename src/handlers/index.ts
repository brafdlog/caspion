import { dialog, ipcMain, ipcRenderer } from 'electron';
import { scrapeAndUpdateOutputVendors } from '@/backend';
import { getConfig } from '@/backend/configManager/configManager';
import { BudgetTrackingEventEmitter } from '@/backend/eventEmitters/EventEmitter';
import { getYnabAccountData } from '@/manual/setupHelpers';
import { App } from '@/app-globals';
import Sentry from '../logging/sentry';
import { getConfigHandler, updateConfigHandler } from './configHandlers';
import { checkForUpdate, downloadUpdate, quitAndInstall } from './updater';
import { getLogsInfoHandler } from './logsHandlers';
import { repository } from '../../package.json';

const functions = {
  showSaveDialog: async () => {
    const dir = await dialog.showSaveDialog({});
    return dir.filePath;
  },
  checkForUpdate,
  downloadUpdate,
  quitAndInstall,
  getConfig: getConfigHandler,
  updateConfig: updateConfigHandler,
  getYnabAccountData,
  getLogsInfo: getLogsInfoHandler,
  getAppInfo: async () => {
    return {
      sourceCommitShort: SOURCE_COMMIT_SHORT,
      repository,
      discordChanel: DISCORD_CHANNEL,
      currentVersion: App.getVersion()
    };
  },
  sentryUserReportProblem: Sentry.userReportProblem,
};

type Functions = typeof functions;

export const ipcHandlers = Object.keys(functions).reduce((acc, funcName) => {
  acc[funcName] = () => ipcRenderer.invoke(funcName);
  return acc;
}, {} as Functions);

export const registerHandlers = () => {
  Object.keys(functions).forEach((funcName) => {
    ipcMain.removeHandler(funcName);
    ipcMain.handle(funcName, functions[funcName]);
  });

  ipcMain.removeAllListeners('scrape');
  ipcMain.on('scrape', async (event, _args) => {
    const config = await getConfig();
    const eventSubscriber = new BudgetTrackingEventEmitter();
    scrapeAndUpdateOutputVendors(config, eventSubscriber);
    eventSubscriber.onAny((eventName, eventData) => {
      event.reply('scrapingProgress', JSON.stringify({ eventName, eventData }));
    });
  });

  ipcMain.removeAllListeners('getYnabAccountData');
  ipcMain.on('getYnabAccountData', async (event, _event, ynabExporterOptions) => {
    const ynabAccountData = await getYnabAccountData(_event, ynabExporterOptions);
    event.reply(ynabAccountData);
  });
};
