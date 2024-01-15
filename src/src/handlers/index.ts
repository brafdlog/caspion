import { App } from '@/app-globals';
import { scrapeAndUpdateOutputVendors } from '@/backend';
import { Credentials } from '@/backend/commonTypes';
import { getConfig } from '@/backend/configManager/configManager';
import { BudgetTrackingEventEmitter } from '@/backend/eventEmitters/EventEmitter';
import electronGoogleOAuth2Connector from '@/backend/export/outputVendors/googleSheets/electronGoogleOAuth2Connector';
import {
  createClient,
  validateToken,
} from '@/backend/export/outputVendors/googleSheets/googleAuth';
import { createSpreadsheet } from '@/backend/export/outputVendors/googleSheets/googleSheets';
import { getAllSpreadsheets } from '@/backend/export/outputVendors/googleSheets/googleSheetsInternalAPI';
import { getYnabAccountData } from '@/manual/setupHelpers';
import { dialog, ipcMain, ipcRenderer } from 'electron';
import { repository } from '../../package.json';
import Sentry from '../logging/sentry';
import { getConfigHandler, updateConfigHandler } from './configHandlers';
import { getLogsInfoHandler } from './logsHandlers';
import { checkForUpdate, downloadUpdate, quitAndInstall } from './updater';

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
      currentVersion: App.getVersion(),
    };
  },
  sentryUserReportProblem: Sentry.userReportProblem,
  // Google Sheets
  getAllUserSpreadsheets: (_, credentials: Credentials) =>
    getAllSpreadsheets(createClient(credentials)),
  validateToken: (_, credentials: Credentials) => validateToken(credentials),
  electronGoogleOAuth2Connector,
  createSpreadsheet: (
    _: any,
    spreadsheetTitle: string,
    credentials: Credentials,
  ) => createSpreadsheet(spreadsheetTitle, credentials),
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
  ipcMain.on(
    'getYnabAccountData',
    async (event, _event, ynabExporterOptions) => {
      const ynabAccountData = await getYnabAccountData(
        _event,
        ynabExporterOptions,
      );
      event.reply(ynabAccountData);
    },
  );
};
