import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import styles from './Config.css';
import events from '../../../../constants/events';
import { jsonStringifyPretty } from '../../../webUtils';

const Config = () => {
  const [configStr, setConfigStr] = useState('{}');

  function saveConfig() {
    ipcRenderer.send(events.config.updateConfig, JSON.parse(configStr));
  }

  useEffect(() => {
    ipcRenderer.send(events.config.getCurrentConfig);
    ipcRenderer.on(events.config.gotCurrentConfig, (event, updatedConfig) => {
      setConfigStr(jsonStringifyPretty(updatedConfig));
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>config</h1>
      <TextField className={styles.configTextField} value={configStr} multiline rows={10} onChange={event => setConfigStr(event.target.value)} />
      <Button variant="contained" color="primary" onClick={saveConfig}>
        Save
      </Button>
    </div>
  );
};

export default Config;
