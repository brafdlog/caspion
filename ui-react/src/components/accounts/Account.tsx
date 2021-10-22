import styles from './Account.module.css';
import { Account as AccountType, ModalStatus } from '../../types';
import logsIcon from '../../assets/card-text.svg';
import settingsIcon from '../../assets/gear.svg';
import StatusIndicator from './StatusIndicator';
import piggyBank from '../../assets/piggy-bank.svg';

type AccountProps = {
  account: AccountType;
  isScraping: boolean;
  showModal: (AccountType, ModalStatus) => {};
}

export default function Account({
  account,
  isScraping,
  showModal
}: AccountProps) {
  const containerStyles = [styles.container];
  if (!account.active) containerStyles.push(styles.notActive);
  const onShowLogsClicked = () => showModal(account, ModalStatus.Logs);
  const onShowSettingsClicked = () => showModal(account, ModalStatus.Settings);
  return (
    <div className={containerStyles.join(' ')}>
      <img src={account.logo || piggyBank} alt={account.displayName} height={29} width={29} />
      <div className={styles.nameWrapper}>
        <div className={styles.name}>{account.displayName}</div>
      </div>
      {isScraping ?
        <img className={styles.logsButton} src={logsIcon} alt="logs" onClick={onShowLogsClicked} /> :
        <img className={styles.settingsButton} src={settingsIcon} alt="settings" onClick={onShowSettingsClicked} />
      }
      <StatusIndicator status={account.status} />
    </div>
  );
}
