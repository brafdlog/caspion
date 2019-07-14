import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import styles from './Config.css';
import { jsonStringifyPretty } from '../../../webUtils';

const Config = ({ config, saveConfig }) => {
  const [configStr, setConfigStr] = useState(jsonStringifyPretty(config));

  useEffect(() => {
    setConfigStr(jsonStringifyPretty(config));
  }, [config]);

  return (
    <div className={styles.container}>
      <h1>הגדרות</h1>
      <TextField className={styles.configTextField} value={configStr} multiline rows={10} onChange={event => setConfigStr(event.target.value)} />
      <Button variant="contained" color="primary" onClick={() => saveConfig(JSON.parse(configStr))}>
        Save
      </Button>
    </div>
  );
};

export default Config;
