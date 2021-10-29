import { BudgetTrackingEvent, Config } from './types';

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

export async function scrape(store) {
    await electron.ipcRenderer.send('scrape');
    if (!progressListenerDefined) {
        electron.ipcRenderer.on('scrapingProgress', (event, progressEventStr) => {
            const progressEvent = JSON.parse(progressEventStr);
            const eventName: string = progressEvent.eventName;
            const eventData: BudgetTrackingEvent = progressEvent.eventData;
            store.handleScrapingEvent(eventName, eventData);
        });
        progressListenerDefined = true;
    }
}