import styles from './AccountsContainer.module.css';
import logsIcon from '../../assets/card-text.svg';
import settingsIcon from '../../assets/gear.svg';
import Account from './Account';
import NewAccount from './NewAccount';
import {ModalStatus, Account as AccountType} from "../../types";

type AccountsContainerProps = {
  title: string;
  accounts: AccountType[];
  isScraping: boolean;
  showModal: (AccountType, ModalStatus) => {};
  handleNewAccountClicked?: () => void
}

function AccountsContainer({ title, accounts, isScraping, showModal, handleNewAccountClicked }: AccountsContainerProps) {
    const { actionButtonIcon, modalStatus } = getActionButtonRelatedProps(isScraping);
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.accountsWrapper}>
        {
          accounts.map(account => {
            return <Account key={account.id} account={account} actionButtonIcon={actionButtonIcon} actionButtonClickHandler={() => showModal(account, modalStatus)} />
          })
        }
          {handleNewAccountClicked ? (
              <NewAccount onClick={handleNewAccountClicked} />
          ) : null
          }
      </div>
    </div>
  );
}

function getActionButtonRelatedProps(isScraping) {
    let actionButtonIcon, modalStatus;
    if (isScraping) {
        actionButtonIcon = logsIcon;
        modalStatus = ModalStatus.Logs;
    } else {
        actionButtonIcon = settingsIcon;
        modalStatus = ModalStatus.Settings;
    }
    return {
        actionButtonIcon,
        modalStatus
    }
}


export default AccountsContainer;
