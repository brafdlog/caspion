import styles from './Account.module.css';
import { Account as AccountType } from '../../types';
import StatusIndicator from './StatusIndicator';
import piggyBank from '../../assets/piggy-bank.svg';

type AccountProps = {
  account: AccountType;
  actionButtonIcon?: string;
  actionButtonClickHandler?: () => void
}

export default function Account({
  account, actionButtonIcon, actionButtonClickHandler
}: AccountProps) {
  const containerStyles = [styles.container];
  if (!account.active) containerStyles.push(styles.notActive);
  return (
    <div className={containerStyles.join(' ')}>
      <img src={account.logo || piggyBank} alt={account.displayName} height={29} width={29} />
      <div className={styles.nameWrapper}>
        <div className={styles.name}>{account.displayName}</div>
      </div>
      {actionButtonIcon ?
        <img className={styles.logsButton} src={actionButtonIcon} alt="action" onClick={actionButtonClickHandler} /> : null
      }
      <StatusIndicator status={account.status} />
    </div>
  );
}
