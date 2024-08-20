import { App } from '@/app-globals';
import { scrapeAndUpdateOutputVendors } from '@/backend';
import { type Credentials } from '@/backend/commonTypes';
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
import { type IpcMainEvent, dialog, ipcMain, type IpcMainInvokeEvent } from 'electron';
import { repository } from '../../../../package.json';
import Sentry from '../logging/sentry';
import { getConfigHandler, updateConfigHandler } from './configHandlers';
import { getLogsInfoHandler } from './logsHandlers';
import { checkForUpdate, downloadUpdate, quitAndInstall } from './updater';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listener<T = unknown> = (event: IpcMainInvokeEvent, ...args: any[]) => (Promise<T>) | T

const functions: Record<string, Listener> = {
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
      sourceCommitShort: import.meta.env.SOURCE_COMMIT_SHORT,
      repository,
      discordChanel: import.meta.env.DISCORD_CHANNEL,
      currentVersion: App.getVersion(),
    };
  },
  sentryUserReportProblem: (_: unknown, title: string, body: string, logs: string, email: string, extra: Record<string, unknown>) =>
     Sentry.userReportProblem(title, body, logs, email, extra),
  // Google Sheets
  getAllUserSpreadsheets: (_: unknown, credentials: Credentials) =>
    getAllSpreadsheets(createClient(credentials)),
  validateToken: (_: unknown, credentials: Credentials) => validateToken(credentials),
  electronGoogleOAuth2Connector,
  createSpreadsheet: (
    _,
    spreadsheetTitle: string,
    credentials: Credentials,
  ) => createSpreadsheet(spreadsheetTitle, credentials),
};

export const registerHandlers = () => {
  Object.keys(functions).forEach((funcName: keyof typeof functions) => {
    ipcMain.removeHandler(funcName);
    ipcMain.handle(funcName, functions[funcName]); // Add index signature
  });

  ipcMain.removeAllListeners('scrape');
  ipcMain.on('scrape', async (event: IpcMainEvent) => {
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
      event.reply('getYnabAccountData', ynabAccountData);
    },
  );
};
