import React, { useEffect } from 'react';
import { getConfig, scrape } from '../eventsBridge';
import Store, { StoreContext } from '../Store';
import TopBar from './topBar/TopBar';
import Body from './Body';
import './App.css';

const store = new Store();
const boundScrape = async () => {
  store.clearScrapingStatus();
  await scrape(store);
};

function App() {
  useEffect(() => {
    getConfig().then((config) => {
      store.configuration = config;
    });
  }, []);

  return (
    <StoreContext.Provider value={store}>
      <div className="App">
        <TopBar />
        <Body scrape={boundScrape} />
      </div>
    </StoreContext.Provider>
  );
}

export default App;
