import { useMemo } from 'react';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import piggyBank from '../../assets/piggy-bank.svg';
import { type Account as AccountType, type ExporterEndEvent } from '../../types';
import styles from './Account.module.css';
import StatusIndicator from './StatusIndicator';

export interface ActionButton {
  icon: string;
  tooltipText: string;
  clickHandler?: () => void;
}

interface AccountProps {
  account: AccountType;
  actionButtons?: ActionButton[];
  onToggleActive?: () => void;
  disabled?: boolean;
}

export default function Account({ account, actionButtons, onToggleActive, disabled }: AccountProps) {
  const containerStyles = useMemo(() => {
    const s = [styles.container];
    if (!account.active) s.push(styles.notActive);
    if (!actionButtons) s.push(styles.pointer);
    return s;
  }, [account.active, actionButtons]);

  const badgeNumberLog = useMemo(
    () =>
      account.logs.find(
        (log) => log.originalEvent && (log.originalEvent as ExporterEndEvent).exportedTransactionsNum > 0,
      ),
    [account.logs],
  );

  return (
    <div className={containerStyles.join(' ')}>
      <img src={account.logo || piggyBank} alt={account.displayName} height={29} width={29} />
      <div className={styles.nameWrapper}>
        <div className={styles.name}>{account.displayName}</div>
      </div>
      {actionButtons?.map(({ icon, clickHandler, tooltipText }) => (
        <img
          className={styles.logsButton}
          src={icon}
          alt="action"
          onClick={clickHandler}
          key={icon}
          title={tooltipText}
        />
      ))}
      {onToggleActive && (
        <Form.Check
          className={styles.activeToggle}
          type="switch"
          checked={account.active}
          onChange={onToggleActive}
          disabled={disabled}
          title={account.active ? 'פעיל' : 'לא פעיל'}
          aria-label={account.active ? 'פעיל' : 'לא פעיל'}
        />
      )}
      <StatusIndicator status={account.status} />
      {badgeNumberLog?.originalEvent && (
        <Badge className={styles.newTxnsIndicator} bg={'success'}>
          {(badgeNumberLog.originalEvent as ExporterEndEvent).exportedTransactionsNum}
        </Badge>
      )}
    </div>
  );
}
