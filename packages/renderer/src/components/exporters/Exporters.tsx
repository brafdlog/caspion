import { useConfigStore } from '../../store/ConfigStore';
import { type Account as AccountType, type Exporter, type ModalStatus } from '../../types';
import Account from '../accounts/Account';
import { getActionButtons } from '../accounts/Importers';

interface ExporterProps {
  exporters: Exporter[];
  isScraping: boolean;
  showModal: (arg0: AccountType, arg1: ModalStatus) => void;
}

function Exporters({ exporters, isScraping, showModal }: ExporterProps) {
  const configStore = useConfigStore();
  return (
    <>
      {exporters.map((exporter) => (
        <Account
          key={exporter.id}
          account={exporter}
          onToggleActive={!isScraping ? () => configStore.toggleExporterActive(exporter.companyId) : undefined}
          actionButtons={getActionButtons(showModal, exporter, isScraping)}
        />
      ))}
    </>
  );
}

export default Exporters;
