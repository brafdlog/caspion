import React from 'react';
import Badge from 'react-bootstrap/Badge';
import piggyBank from '../../assets/piggy-bank.svg';
import { Account as AccountType } from '../../types';
import styles from './Account.module.css';
import StatusIndicator from './StatusIndicator';

export type ActionButton = {
  icon: string;
  tooltipText: string;
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

  const badgeNumberLog = account.logs.find((log) => log.originalEvent && log.originalEvent.exportedTransactionsNum > 0);
  if (!account.active) containerStyles.push(styles.notActive);
  return (
    <div className={containerStyles.join(' ')}>
      <img src={account.logo || piggyBank} alt={account.displayName} height={29} width={29} />
      <div className={styles.nameWrapper}>
        <div className={styles.name}>{account.displayName}</div>
      </div>
      {
        actionButtons && actionButtons.map(({ icon, clickHandler, tooltipText }) => <img className={styles.logsButton}
        src={icon} alt="action" onClick={clickHandler} key={icon} title={tooltipText}/>)
      }
      <StatusIndicator status={account.status} />
      {badgeNumberLog && <Badge className={styles.newTxnsIndicator} bg={'success'}>{badgeNumberLog.originalEvent.exportedTransactionsNum}</Badge>}
    </div>
  );
}
