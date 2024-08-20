import logsIcon from '../../assets/card-text.svg';
import settingsIcon from '../../assets/gear.svg';
import resultsIcon from '../../assets/results.svg';
import {
  AccountStatus,
  ModalStatus,
  AccountType as TypeOfAccount,
  type Account as AccountType
} from '../../types';
import Account, { type ActionButton } from './Account';
import NewAccount from './NewAccount';
import { useConfigStore } from '/@/store/ConfigStore';

interface ImportersProps {
  accounts: AccountType[];
  isScraping: boolean;
  showModal: (AccountType: AccountType, ModalStatus: ModalStatus) => void;
  handleNewAccountClicked?: () => void;
}

function Importers({ accounts, isScraping, showModal, handleNewAccountClicked }: ImportersProps) {
  const configStore = useConfigStore();
  return (
    <>
      {accounts.map(account => {
        return (
          <Account
            key={account.id}
            account={account}
            actionButtons={getActionButtons(showModal, account, isScraping, () => {
              configStore.openResults(account.companyId);
            })}
          />
        );
      })}
      {handleNewAccountClicked ? <NewAccount onClick={handleNewAccountClicked} /> : null}
    </>
  );
}

export function getActionButtons(
  showModal: (AccountType: AccountType, ModalStatus: ModalStatus) => void,
  account: AccountType,
  isScraping: boolean,
  openResultsHandler?: () => void,
): ActionButton[] {
  const logsActionButton = {
    icon: logsIcon,
    clickHandler: () => showModal(account, ModalStatus.LOGS),
    tooltipText: 'לוגים',
  };

  const accountSettingsActionButton = {
    icon: settingsIcon,
    clickHandler: () =>
      showModal(
        account,
        account.type === TypeOfAccount.IMPORTER
          ? ModalStatus.IMPORTER_SETTINGS
          : ModalStatus.EXPORTER_SETTINGS,
      ),
    tooltipText: 'הגדרות',
  };

  const actionButtons: ActionButton[] = [];

  const shouldLog =
    account.status !== AccountStatus.PENDING && account.status !== AccountStatus.IDLE;

  const openResultsButton = {
    icon: resultsIcon,
    tooltipText: 'פתיחת תוצאות',
    clickHandler: openResultsHandler,
  };

  if (shouldLog) {
    actionButtons.push(logsActionButton);
  }

  if (!isScraping) {
    actionButtons.push(accountSettingsActionButton);
  }

  if (account.type === TypeOfAccount.EXPORTER) {
    actionButtons.push(openResultsButton);
  }

  return actionButtons;
}

export default Importers;
