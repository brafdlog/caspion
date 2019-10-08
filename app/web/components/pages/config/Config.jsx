import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import { get, set, cloneDeep } from 'lodash';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FinancialAccountConfig from './FinancialAccountConfig';
import styles from './Config.css';
import { jsonStringifyPretty } from '../../../webUtils';
import { FINANCIAL_COMPANIES, FINANCIAL_COMPANIES_CONFIG } from '../../../constants/financialCompaniesConfig';

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

  function createNewFinancialAccount() {
    const updatedConfig = cloneDeep(config);
    updatedConfig.scraping.accountsToScrape.push({
      companyId: FINANCIAL_COMPANIES_CONFIG[FINANCIAL_COMPANIES.LEUMI_CARD].id,
      credentials: {},
      active: true
    });
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
      <Fab color="primary">
        <AddIcon onClick={createNewFinancialAccount} />
      </Fab>
      <TextField className={styles.configTextField} value={configStr} multiline rows={10} onChange={event => setConfigStr(event.target.value)} />
      <Button variant="contained" color="primary" onClick={() => saveConfig(JSON.parse(configStr))}>
        Save
      </Button>
    </div>
  );
};

export default Config;
