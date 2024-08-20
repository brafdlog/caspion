import { type ModalStatus, type Account as AccountType } from '../../types';
import Account from '../accounts/Account';
import { getActionButtons } from '../accounts/Importers';

interface ExporterProps {
  exporters: AccountType[];
  isScraping: boolean;
  showModal: (arg0: AccountType, arg1: ModalStatus) => void;
}

function Exporters({ exporters, isScraping, showModal }: ExporterProps) {
  return (
    <>
      {exporters.map(exporter => (
        <Account
          key={exporter.id}
          account={exporter}
          actionButtons={getActionButtons(showModal, exporter, isScraping)}
        />
      ))}
    </>
  );
}

export default Exporters;
