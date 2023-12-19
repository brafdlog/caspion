import {
  Credentials,
  FinancialAccountDetails,
  YnabAccountDetails,
} from '../../src/backend/commonTypes';
import { Config, YnabConfig } from './types';

const electron = window.require('electron');

let progressListenerDefined = false;

export async function getConfig(): Promise<Config> {
  const configStr = await electron.ipcRenderer.invoke('getConfig');
  const { config } = JSON.parse(configStr);
  return config;
}

export async function updateConfig(config: Config) {
  await electron.ipcRenderer.invoke('updateConfig', JSON.stringify(config));
}

export async function getYnabAccountData(
  ynabOptions: YnabConfig['options'],
): Promise<{
  ynabAccountData: YnabAccountDetails;
  financialAccountDetails: FinancialAccountDetails[];
}> {
  return electron.ipcRenderer.invoke('getYnabAccountData', ynabOptions);
}

export async function scrape(store) {
  await electron.ipcRenderer.send('scrape');
  if (!progressListenerDefined) {
    electron.ipcRenderer.on('scrapingProgress', (_, progressEventStr) => {
      const progressEvent = JSON.parse(progressEventStr);
      const { eventName } = progressEvent;
      const { eventData } = progressEvent;
      store.handleScrapingEvent(eventName, eventData);
    });
    progressListenerDefined = true;
  }
}

export async function toggleUIVersion() {
  await electron.ipcRenderer.send('toggleUiVersion');
}

export async function openExternal(url: string) {
  await electron.shell.openExternal(url);
}

export async function openItem(filePath: string) {
  await electron.shell.openPath(filePath);
}

export async function getLogsInfo(numOfLastLines: number) {
  return electron.ipcRenderer.invoke('getLogsInfo', numOfLastLines);
}

export async function sentryUserReportProblem(reportProblem) {
  return electron.ipcRenderer.invoke('sentryUserReportProblem', reportProblem);
}

export async function checkForUpdate() {
  return electron.ipcRenderer.invoke('checkForUpdate');
}

export async function getAppInfo() {
  return electron.ipcRenderer.invoke('getAppInfo');
}

export async function downloadUpdate() {
  return electron.ipcRenderer.invoke('downloadUpdate');
}

export async function showSaveDialog() {
  return electron.ipcRenderer.invoke('showSaveDialog');
}

export async function quitAndInstall() {
  return electron.ipcRenderer.invoke('quitAndInstall');
}

// Google Sheets
export async function validateToken(
  credentials: Credentials,
): Promise<boolean> {
  return electron.ipcRenderer.invoke('validateToken', credentials);
}
export async function getAllUserSpreadsheets(credentials: Credentials) {
  return electron.ipcRenderer.invoke('getAllUserSpreadsheets', credentials);
}
export async function electronGoogleOAuth2Connector(): Promise<Credentials> {
  return electron.ipcRenderer.invoke('electronGoogleOAuth2Connector');
}
export async function createSpreadsheet(
  spreadsheetId: string,
  credentials: Credentials,
): Promise<string> {
  return electron.ipcRenderer.invoke(
    'createSpreadsheet',
    spreadsheetId,
    credentials,
  );
}
