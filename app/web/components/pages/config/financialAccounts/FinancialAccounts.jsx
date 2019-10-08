import React from 'react';
import Fab from '@material-ui/core/Fab';
import { cloneDeep, set } from 'lodash';
import AddIcon from '@material-ui/icons/Add';
import FinancialAccountConfig from './FinancialAccountConfig';
import styles from './FinancialAccounts.scss';
import { FINANCIAL_COMPANIES, FINANCIAL_COMPANIES_CONFIG } from '../../../../constants/financialCompaniesConfig';

const FinancialAccounts = ({ financialAccounts, updateFinancialAccountsConfig }) => {
  function updateFinancialAccount(accountIndex, updatedFinancialAccountData) {
    const financialAccountConfigToUpdate = cloneDeep(financialAccounts);
    set(financialAccountConfigToUpdate, `${accountIndex}`, updatedFinancialAccountData);
    updateFinancialAccountsConfig(financialAccountConfigToUpdate);
  }

  function createNewFinancialAccount() {
    const financialAccountConfigToUpdate = cloneDeep(financialAccounts);
    financialAccountConfigToUpdate.push({
      companyId: FINANCIAL_COMPANIES_CONFIG[FINANCIAL_COMPANIES.LEUMI_CARD].id,
      credentials: {},
      active: true
    });
    updateFinancialAccountsConfig(financialAccountConfigToUpdate);
  }

  return (
    <div className={styles.wrapper}>
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
    </div>
  );
};

export default FinancialAccounts;
