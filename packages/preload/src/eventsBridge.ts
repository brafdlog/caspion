import { ipcRenderer, shell } from 'electron';
import {
  type Config,
  type Credentials,
  type HandleScrapingEvent,
  type YnabAccountDataType,
  type YnabConfig,
} from './commonTypes';

export async function getConfig(): Promise<Config> {
  const configStr = await ipcRenderer.invoke('getConfig');
  const { config } = JSON.parse(configStr);
  return config;
}

export async function updateConfig(config: Config) {
  await ipcRenderer.invoke('updateConfig', JSON.stringify(config));
}

export async function getYnabAccountData(
  ynabOptions: YnabConfig['options'],
): Promise<YnabAccountDataType> {
  return ipcRenderer.invoke('getYnabAccountData', ynabOptions);
}

let progressListenerDefined = false;

export async function scrape(handleScrapingEvent: HandleScrapingEvent) {
  console.log('Sending scrape event to main');
  await ipcRenderer.send('scrape');
  if (!progressListenerDefined) {
    ipcRenderer.on('scrapingProgress', (_, progressEventStr) => {
      const progressEvent = JSON.parse(progressEventStr);
      const { eventName, eventData } = progressEvent;
      console.log('Received scraping progress event', eventName, eventData);
      handleScrapingEvent(eventName, eventData);
    });
    progressListenerDefined = true;
  }
}

export async function toggleUIVersion() {
  await ipcRenderer.send('toggleUiVersion');
}

export async function openExternal(url: string) {
  await shell.openExternal(url);
}

export async function openItem(filePath: string) {
  await shell.openPath(filePath);
}

export async function getLogsInfo(numOfLastLines: number) {
  return ipcRenderer.invoke('getLogsInfo', numOfLastLines);
}

export async function sentryUserReportProblem(reportProblem: object) {
  return ipcRenderer.invoke('sentryUserReportProblem', reportProblem);
}

export async function checkForUpdate() {
  return ipcRenderer.invoke('checkForUpdate');
}

export async function getAppInfo() {
  return ipcRenderer.invoke('getAppInfo');
}

export async function downloadUpdate() {
  return ipcRenderer.invoke('downloadUpdate');
}

export async function showSaveDialog() {
  return ipcRenderer.invoke('showSaveDialog');
}

export async function quitAndInstall() {
  return ipcRenderer.invoke('quitAndInstall');
}

// Google Sheets
export async function validateToken(
  credentials: Credentials,
): Promise<boolean> {
  return ipcRenderer.invoke('validateToken', credentials);
}
export async function getAllUserSpreadsheets(credentials: Credentials) {
  return ipcRenderer.invoke('getAllUserSpreadsheets', credentials);
}
export async function electronGoogleOAuth2Connector(): Promise<Credentials> {
  return ipcRenderer.invoke('electronGoogleOAuth2Connector');
}
export async function createSpreadsheet(
  spreadsheetId: string,
  credentials: Credentials,
): Promise<string> {
  return ipcRenderer.invoke(
    'createSpreadsheet',
    spreadsheetId,
    credentials,
  );
}
