import { scrape } from '#preload';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { Button, Container, Image, Modal, Stack } from 'react-bootstrap';
import settingsIcon from '../assets/gear.svg';
import { useConfigStore } from '../store/ConfigStore';
import {
  ModalStatus,
  OutputVendorName,
  type YnabConfig,
  type Account,
  type Exporter,
  type Importer,
  type GoogleSheetsConfig,
} from '../types';
import styles from './Body.module.css';
import CheckForUpdates from './CheckForUpdates';
import ChromeDownloadProgress from './ChromeDownloadProgress';
import GeneralSettings from './GeneralSettings';
import AccountLogs from './accounts/AccountLogs';
import AccountsContainer from './accounts/AccountsContainer';
import CreateImporter from './accounts/CreateImporter';
import EditImporter from './accounts/EditImporter';
import Importers from './accounts/Importers';
import EditExporter, { type EditExporterProps } from './exporters/EditExporter';
import Exporters from './exporters/Exporters';

const Body = () => {
  const configStore = useConfigStore();
  const cleanAndScrape = useCallback(() => {
    configStore.clearScrapingStatus();
    return scrape(configStore.handleScrapingEvent.bind(configStore));
  }, [configStore]);

  const [modalStatus, setModalStatus] = useState<ModalStatus>(ModalStatus.HIDDEN);

  const [currentAccount, setCurrentAccount] = useState<Account>();
  const closeModal = () => setModalStatus(ModalStatus.HIDDEN);
  const showModal = (account: Account, status: ModalStatus) => {
    setCurrentAccount(account);
    setModalStatus(status);
  };

  const wideModal = shouldShowWideModal(modalStatus, currentAccount);

  const newScraperClicked = () => {
    setModalStatus(ModalStatus.NEW_SCRAPER);
  };

  const createImporter = async (importer: Importer) => {
    await configStore.addImporter(importer);
    closeModal();
  };
  const updateImporter = async (importer: Importer) => {
    await configStore.updateImporter(importer.id, importer);
    closeModal();
  };

  const updateExporter: EditExporterProps['handleSave'] = async (
    exporter: Exporter | YnabConfig | GoogleSheetsConfig,
  ) => {
    await configStore.updateExporter(exporter as Exporter);
    closeModal();
  };

  const deleteImporter = async (importerId: string) => {
    await configStore.deleteImporter(importerId);
    closeModal();
  };

  const shouldShowNextRunTime = !!(
    configStore.nextAutomaticScrapeDate && Number(configStore.config.scraping.periodicScrapingIntervalHours)
  );
  const nextRunTimeString = configStore.nextAutomaticScrapeDate
    ? new Date(configStore.nextAutomaticScrapeDate).toLocaleTimeString()
    : null;

  return (
    <Container className={styles.root}>
      <Container className={styles.container}>
        <div className={styles.contentContainer}>
          <Stack direction="horizontal" className={styles.customGap}>
            {configStore.config?.scraping && (
              <AccountsContainer title="בנקים וכרטיסי אשראי">
                <Importers
                  accounts={configStore.importers}
                  isScraping={configStore.isScraping}
                  showModal={showModal}
                  handleNewAccountClicked={newScraperClicked}
                />
              </AccountsContainer>
            )}
            {configStore.config?.outputVendors && (
              <AccountsContainer title="תוכנות ניהול תקציב">
                <Exporters
                  exporters={configStore.exporters}
                  isScraping={configStore.isScraping}
                  showModal={showModal}
                />
              </AccountsContainer>
            )}
          </Stack>
        </div>
        <Modal
          show={modalStatus !== ModalStatus.HIDDEN}
          onHide={closeModal}
          dialogClassName={wideModal ? styles.modalWide : ''}
        >
          <Modal.Header closeButton className={styles.modalHeader}></Modal.Header>
          <Modal.Body>
            {modalStatus === ModalStatus.LOGS && currentAccount && <AccountLogs logs={currentAccount.logs} />}
            {modalStatus === ModalStatus.IMPORTER_SETTINGS && currentAccount && (
              <EditImporter
                handleSave={updateImporter}
                importer={currentAccount as Importer}
                handleDelete={deleteImporter}
              />
            )}
            {modalStatus === ModalStatus.EXPORTER_SETTINGS && currentAccount && (
              <EditExporter handleSave={updateExporter} exporter={currentAccount as Exporter} />
            )}
            {modalStatus === ModalStatus.NEW_SCRAPER && (
              <CreateImporter handleSave={createImporter} cancel={closeModal} />
            )}
            {modalStatus === ModalStatus.GENERAL_SETTINGS && <GeneralSettings />}
          </Modal.Body>
        </Modal>
      </Container>
      <Container className={styles.buttonsContainer}>
        <ChromeDownloadProgress />
        <Button variant="dark" size="lg" onClick={cleanAndScrape} disabled={configStore.isScraping}>
          הפעל
        </Button>
        {shouldShowNextRunTime && <h6>ריצה הבאה: {nextRunTimeString}</h6>}
        <Image
          src={settingsIcon}
          onClick={() => showModal({} as Account, ModalStatus.GENERAL_SETTINGS)}
          className={styles.pointer}
        />
        <CheckForUpdates />
      </Container>
    </Container>
  );
};

function shouldShowWideModal(modalStatus: ModalStatus, currentAccount?: Account) {
  return (
    modalStatus === ModalStatus.EXPORTER_SETTINGS &&
    currentAccount &&
    currentAccount.companyId === OutputVendorName.YNAB
  );
}

export default observer(Body);
