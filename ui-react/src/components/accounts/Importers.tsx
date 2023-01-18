import React from 'react';
import logsIcon from '../../assets/card-text.svg';
import settingsIcon from '../../assets/gear.svg';
import {
  Account as AccountType, AccountStatus, AccountType as TypeOfAccount, ModalStatus
} from '../../types';
import Account, { ActionButton } from './Account';
import NewAccount from './NewAccount';

type ImportersProps = {
    accounts: AccountType[];
    isScraping: boolean;
    showModal: (AccountType, ModalStatus) => void;
    handleNewAccountClicked?: () => void
}

function Importers({
  accounts, isScraping, showModal, handleNewAccountClicked
}: ImportersProps) {
  return (
        <>
            {
                accounts.map((account) => {
                  return <Account key={account.id} account={account} actionButtons={getActionButtons(showModal, account, isScraping)} />;
                })
            }
            {handleNewAccountClicked ? (
                <NewAccount onClick={handleNewAccountClicked} />
            ) : null
            }
        </>
  );
}

export function getActionButtons(showModal, account: AccountType, isScraping): ActionButton[] {
  const logsActionButton = {
    icon: logsIcon,
    clickHandler: () => showModal(account, ModalStatus.LOGS)
  };

  const accountSettingsActionButton = {
    icon: settingsIcon,
    clickHandler: () => showModal(account, account.type === TypeOfAccount.IMPORTER ? ModalStatus.IMPORTER_SETTINGS : ModalStatus.EXPORTER_SETTINGS)
  };

  const actionButtons: ActionButton[] = [];

  const shouldLog = account.status !== AccountStatus.PENDING && account.status !== AccountStatus.IDLE;

  if (shouldLog) {
    actionButtons.push(logsActionButton);
  }

  if (!isScraping) {
    actionButtons.push(accountSettingsActionButton);
  }

  return actionButtons;
}

export default Importers;
