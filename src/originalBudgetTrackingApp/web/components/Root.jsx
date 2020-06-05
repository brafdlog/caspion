import React, { useEffect, useState } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import HomePage from './pages/HomePage';
import Config from './pages/config/Config';
import Sidebar from './sidebar/Sidebar';
import styles from './Root.css';
import events from '../../constants/events';

const Root = () => {
  const [config, setConfig] = useState({});

  function saveConfig(updatedConfig) {
    setConfig(updatedConfig);
    ipcRenderer.send(events.config.updateConfig, updatedConfig);
  }

  useEffect(() => {
    ipcRenderer.send(events.config.getCurrentConfig);
    ipcRenderer.on(events.config.gotCurrentConfig, (event, updatedConfig) => {
      setConfig(updatedConfig);
    });
  }, []);

  return (
    <div className={styles.appWrapper}>
      <HashRouter>
        <Sidebar />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/config" render={props => <Config {...props} config={config} saveConfig={saveConfig} />} />
      </HashRouter>
    </div>
  );
};

export default Root;
