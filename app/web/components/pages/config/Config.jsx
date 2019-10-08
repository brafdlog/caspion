import React, { useState, useEffect } from 'react';
import { cloneDeep, get } from 'lodash';
import { TextField, Button } from '@material-ui/core';
import FinancialAccounts from './financialAccounts/FinancialAccounts';
import styles from './Config.css';
import { jsonStringifyPretty } from '../../../webUtils';

const Config = ({ config, saveConfig }) => {
  const [configStr, setConfigStr] = useState(jsonStringifyPretty(config));
  const financialAccounts = get(config, 'scraping.accountsToScrape', []);

  useEffect(() => {
    setConfigStr(jsonStringifyPretty(config));
  }, [config]);

  function updateFinancialAccountsConfig(updatedFinancialAccounts) {
    const updatedConfig = cloneDeep(config);
    updatedConfig.scraping.accountsToScrape = updatedFinancialAccounts;
    saveConfig(updatedConfig);
  }

  return (
    <div className={styles.container}>
      <h1>הגדרות</h1>
      <FinancialAccounts financialAccounts={financialAccounts} updateFinancialAccountsConfig={updateFinancialAccountsConfig} />
      <TextField className={styles.configTextField} value={configStr} multiline rows={10} onChange={event => setConfigStr(event.target.value)} />
      <Button variant="contained" color="primary" onClick={() => saveConfig(JSON.parse(configStr))}>
        Save
      </Button>
    </div>
  );
};

export default Config;
