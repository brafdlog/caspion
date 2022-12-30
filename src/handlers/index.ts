import { dialog, ipcMain, ipcRenderer } from 'electron';
import { scrapeAndUpdateOutputVendors } from '@/backend';
import { getConfig } from '@/backend/configManager/configManager';
import { BudgetTrackingEventEmitter } from '@/backend/eventEmitters/EventEmitter';
import { getYnabAccountData } from '@/manual/setupHelpers';
import Sentry from '../logging/sentry';
import { getConfigHandler, updateConfigHandler } from './configHandlers';
import { checkForUpdate, downloadUpdate, quitAndInstall } from './updater';
import { getLogsInfoHandler } from './logsHandlers';
import { googleLoginHandler, validateTokenHandler } from './googleAuthHandlers';

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
  electronGoogleLogin: googleLoginHandler,
  validateToken: validateTokenHandler,
  getLogsInfo: getLogsInfoHandler,

  sourceCommitShort: async () => {
    return SOURCE_COMMIT_SHORT;
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
    ipcMain.handle(funcName, functions[funcName]);
  });
  ipcMain.on('scrape', async (event, _args) => {
    const config = await getConfig();
    const eventSubscriber = new BudgetTrackingEventEmitter();
    scrapeAndUpdateOutputVendors(config, eventSubscriber);
    eventSubscriber.onAny((eventName, eventData) => {
      event.reply('scrapingProgress', JSON.stringify({ eventName, eventData }));
    });
  });
  ipcMain.on('getYnabAccountData', async (event, _event, ynabExporterOptions) => {
    const ynabAccountData = await getYnabAccountData(_event, ynabExporterOptions);
    event.reply(ynabAccountData);
  });
};
