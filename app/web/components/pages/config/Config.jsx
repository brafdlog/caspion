import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { get, set, cloneDeep } from 'lodash';
import FinancialAccountConfig from './FinancialAccountConfig';
import styles from './Config.css';
import { jsonStringifyPretty } from '../../../webUtils';

const Config = ({ config, saveConfig }) => {
  const [configStr, setConfigStr] = useState(jsonStringifyPretty(config));
  const financialAccounts = get(config, 'scraping.accountsToScrape', []);

  useEffect(() => {
    setConfigStr(jsonStringifyPretty(config));
  }, [config]);

  function updateFinancialAccount(accountIndex, updatedFinancialAccountData) {
    const updatedConfig = cloneDeep(config);
    set(updatedConfig, `scraping.accountsToScrape[${accountIndex}]`, updatedFinancialAccountData);
    saveConfig(updatedConfig);
  }

  return (
    <div className={styles.container}>
      <h1>הגדרות</h1>
      {financialAccounts.map((financialAccount, accountIndex) => (
        <FinancialAccountConfig
          key={`${financialAccount.credentials.username}_${financialAccount.companyId}`}
          updateFinancialAccount={updateFinancialAccount.bind(this, accountIndex)}
          companyId={financialAccount.companyId}
          credentials={financialAccount.credentials}
        />
      ))}
      <TextField className={styles.configTextField} value={configStr} multiline rows={10} onChange={event => setConfigStr(event.target.value)} />
      <Button variant="contained" color="primary" onClick={() => saveConfig(JSON.parse(configStr))}>
        Save
      </Button>
    </div>
  );
};

export default Config;
