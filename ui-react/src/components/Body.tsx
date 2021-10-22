import styles from './Body.module.css';
import { Account } from '../types';
import { Button, Modal } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../Store';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import AccountsContainer from './accounts/AccountsContainer';
import { ModalStatus } from '../types';

type BodyProps = {
  scrape
};

const Body = ({ scrape }: BodyProps) => {
  const store = useContext(StoreContext);
  const config = store.config;
  const isScraping = store.isScraping;
  const [modalStatus, setModalStatus] = useState<ModalStatus>(ModalStatus.Hidden);

  const [currentAccount, setCurrentAccount] = useState<Account>();
  const closeModal = () => setModalStatus(ModalStatus.Hidden);
  const showModal = (account: Account, modalStatus: ModalStatus) => {
    setCurrentAccount(account);
    setModalStatus(modalStatus);
    debugger;
  };
  return (
    <div>
      <Container className={styles.container}>
        <div className={styles.contentContainer}>
          <Stack direction="horizontal" gap={5}>
            {config && config.scraping &&
            <AccountsContainer title="בנקים וכרטיסי אשראי" accounts={store.importers} isScraping={isScraping} showModal={showModal} />}
            {config && config.outputVendors &&
            <AccountsContainer title="תוכנות ניהול תקציב" accounts={store.exporters} isScraping={isScraping} showModal={showModal} />}
          </Stack>
        </div>
        <Modal show={modalStatus !== ModalStatus.Hidden} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{currentAccount && currentAccount.displayName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { modalStatus === ModalStatus.Logs && currentAccount && currentAccount.logs.map(log => <div key={log.message}>{log.message}</div>)}
            { modalStatus === ModalStatus.Settings && currentAccount && <h3>Placeholder for SETTINGS</h3>}
          </Modal.Body>
        </Modal>
      </Container>
      <Button onClick={scrape} disabled={store.isScraping}>הפעל</Button>
    </div>

  );
};

export default observer(Body);
