import styles from './AccountsContainer.module.css';
import Account from './Account';

type AccountsContainerProps = {
  title: string;
  accounts: Account[];
  isScraping: boolean;
  showModal: (AccountType, ModalStatus) => {}
}

function AccountsContainer({ title, accounts, isScraping, showModal }: AccountsContainerProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.accountsWrapper}>
        {
          accounts.map(account => {
            return <Account key={account.id} account={account} isScraping={isScraping} showModal={showModal} />
          })
        }
      </div>
    </div>
  );
}

export default AccountsContainer;
