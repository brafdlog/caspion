import React, { useEffect } from 'react';
import Store, { StoreContext } from '../Store';
import TopBar from './topBar/TopBar';
import Body from './Body';
import './App.css';
import { BudgetTrackingEvent } from '../types';

const electron = window.require('electron');

const store = new Store();

function App() {
  useEffect(() => {
    electron.ipcRenderer.invoke('getConfig').then(configStr => {
      const configObj = JSON.parse(configStr);
      store.configuration = configObj.config;
    });
  }, []);

  function scrape() {
    electron.ipcRenderer.send('scrape');
    electron.ipcRenderer.on('scrapingProgress', (event, progressEventStr) => {
      const progressEvent = JSON.parse(progressEventStr);
      const eventName: string = progressEvent.eventName;
      const eventData: BudgetTrackingEvent = progressEvent.eventData;
      console.log(eventData);
      store.handleScrapingEvent(eventName, eventData);
    });
  }

  return (
    <StoreContext.Provider value={store}>
      <div className="App">
        <TopBar />
        <Body scrape={scrape} />
      </div>
    </StoreContext.Provider>
  );
}

export default App;
