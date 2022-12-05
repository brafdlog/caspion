import styles from './Body.module.css';
import { Account, Exporter, Importer, ModalStatus, OutputVendorName } from '../types';
import settingsIcon from '../assets/gear.svg';
import { Button, Image, Form, Modal } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '../Store';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import AccountsContainer from './accounts/AccountsContainer';
import EditImporter from './accounts/EditImporter';
import CreateImporter from './accounts/CreateImporter';
import Importers from './accounts/Importers';
import Exporters from './exporters/Exporters';
import EditExporter from './exporters/EditExporter';
import AccountLogs from './accounts/AccountLogs';
import { toggleUIVersion } from '../eventsBridge';
import GeneralSettings from './GeneralSettings';

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
  };

  const wideModal = shouldShowWideModal(modalStatus, currentAccount);

  const newScraperClicked = () => {
    setModalStatus(ModalStatus.NewScraper);
  };

  const createImporter = async (importer: Importer) => {
    await store.addImporter(importer);
    closeModal();
  };
  const updateImporter = async (importer: Importer) => {
    await store.updateImporter(importer.id, importer);
    closeModal();
  };

  const updateExporter = async (exporter: Exporter) => {
    await store.updateExporter(exporter);
    closeModal();
  };

  const deleteImporter = async (importerId) => {
    await store.deleteImporter(importerId);
    closeModal();
  };

  return (
    <div>
      <Container className={styles.container} >
        <div className={styles.contentContainer}>
          <Stack direction="horizontal" gap={5}>
            {config && config.scraping &&
            <AccountsContainer title="בנקים וכרטיסי אשראי">
              <Importers accounts={store.importers} isScraping={isScraping} showModal={showModal} handleNewAccountClicked={newScraperClicked} />
            </AccountsContainer>}
            {config && config.outputVendors &&
            <AccountsContainer title="תוכנות ניהול תקציב" accounts={store.exporters} isScraping={isScraping} showModal={showModal} >
              <Exporters exporters={store.exporters} isScraping={isScraping} showModal={showModal} />
            </AccountsContainer>
            }
          </Stack>
        </div>
        <Modal show={modalStatus !== ModalStatus.Hidden} onHide={closeModal} dialogClassName={wideModal ? styles.modalWide : ''}>
          <Modal.Header closeButton className={styles.modalHeader}>
          </Modal.Header>
          <Modal.Body>
            { modalStatus === ModalStatus.Logs && currentAccount && <AccountLogs logs={currentAccount.logs} /> }
            { modalStatus === ModalStatus.ImporterSettings && currentAccount && <EditImporter handleSave={updateImporter} importer={currentAccount} handleDelete={deleteImporter} />}
            { modalStatus === ModalStatus.SettingsExporter && currentAccount && <EditExporter handleSave={updateExporter} exporter={currentAccount} handleDelete={deleteImporter} />}
            { modalStatus === ModalStatus.NewScraper && <CreateImporter handleSave={createImporter} />}
            { modalStatus === ModalStatus.GeneralSettings && <GeneralSettings /> }
          </Modal.Body>
        </Modal>
      </Container>
      <Container className={styles.buttonsContainer}>
        <Button variant="dark" size="lg" className={styles.scrapeButton} onClick={scrape} disabled={store.isScraping}>הפעל</Button>
        <Image src={settingsIcon} onClick={() => showModal(null, ModalStatus.GeneralSettings)} />
        <Form.Check
            type="switch"
            onClick={toggleUIVersion}
            label="מעבר לממשק ישן"
            defaultChecked
        />
      </Container>
    </div>
  );
};

function shouldShowWideModal(modalStatus: ModalStatus, currentAccount?: Account) {
  return modalStatus === ModalStatus.SettingsExporter && currentAccount && currentAccount.companyId === OutputVendorName.YNAB;
}

export default observer(Body);
