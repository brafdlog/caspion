import React from 'react';
import { cloneDeep, get } from 'lodash';
import FinancialAccounts from './financialAccounts/FinancialAccounts';
import AdvancedConfig from './advancedConfig/AdvancedConfig';
import styles from './Config.css';

const Config = ({ config, saveConfig }) => {
  const financialAccounts = get(config, 'scraping.accountsToScrape', []);

  function updateFinancialAccountsConfig(updatedFinancialAccounts) {
    const updatedConfig = cloneDeep(config);
    updatedConfig.scraping.accountsToScrape = updatedFinancialAccounts;
    saveConfig(updatedConfig);
  }

  return (
    <div className={styles.container}>
      <h1>הגדרות</h1>
      <FinancialAccounts financialAccounts={financialAccounts} updateFinancialAccountsConfig={updateFinancialAccountsConfig} />
      <AdvancedConfig config={config} saveConfig={saveConfig} />
    </div>
  );
};

export default Config;
