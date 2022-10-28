import styles from './Account.module.css';
import { Account as AccountType } from '../../types';
import StatusIndicator from './StatusIndicator';
import piggyBank from '../../assets/piggy-bank.svg';

export type ActionButton = {
    icon: string;
    clickHandler: () => void;
}

type AccountProps = {
  account: AccountType;
  actionButtons?: ActionButton[]
}

export default function Account({
  account, actionButtons
}: AccountProps) {
  const containerStyles = [styles.container];
  if (!account.active) containerStyles.push(styles.notActive);
  return (
    <div className={containerStyles.join(' ')}>
      <img src={account.logo || piggyBank} alt={account.displayName} height={29} width={29} />
      <div className={styles.nameWrapper}>
        <div className={styles.name}>{account.displayName}</div>
      </div>
        {actionButtons && actionButtons.map(({ icon, clickHandler }) =>
            <img className={styles.logsButton} src={icon} alt="action" onClick={clickHandler} key={icon} />)
        }
      <StatusIndicator status={account.status} />
    </div>
  );
}
