import { BudgetTrackingEvent, Config, YnabConfig } from './types';

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

export async function getYnabAccountData(ynabOptions: YnabConfig['options']):
  Promise<{ ynabAccountData: YnabAccountDetails, financialAccountDetails: FinancialAccountDetails[] }> {
  return electron.ipcRenderer.invoke('getYnabAccountData', ynabOptions);
}

export async function scrape(store) {
  await electron.ipcRenderer.send('scrape');
  if (!progressListenerDefined) {
    electron.ipcRenderer.on('scrapingProgress', (event, progressEventStr) => {
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

export async function getLogsInfo(numOfLastLines:number) {
  return electron.ipcRenderer.invoke('getLogsInfo', numOfLastLines);
}

export async function sentryUserReportProblem(reportProblem) {
  return electron.ipcRenderer.invoke('sentryUserReportProblem', reportProblem);
}

export async function sourceCommitShort() {
  return electron.ipcRenderer.invoke('sourceCommitShort');
}

export async function showSaveDialog() {
  return electron.ipcRenderer.invoke('showSaveDialog');
}
