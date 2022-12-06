import Account from '../accounts/Account';
import { Account as AccountType } from '../../types';
import { getActionButtons } from '../accounts/Importers';

type ExporterProps = {
  exporters: AccountType[];
  isScraping: boolean;
  showModal: (AccountType, ModalStatus) => void;
}

function Exporters({ exporters, isScraping, showModal }: ExporterProps) {
  return (
        <>
            {exporters.map((exporter) => <Account key={exporter.id} account={exporter} actionButtons={getActionButtons(showModal, exporter, isScraping)} />)}
        </>
  );
}

export default Exporters;
