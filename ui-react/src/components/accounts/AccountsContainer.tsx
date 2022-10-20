import React from 'react';
import styles from './AccountsContainer.module.css';

type AccountsContainerProps = {
  title: string;
  children: React.ReactNode;
}

function AccountsContainer({ title, children }: AccountsContainerProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.accountsWrapper}>
          {children}
      </div>
    </div>
  );
}

export default AccountsContainer;
