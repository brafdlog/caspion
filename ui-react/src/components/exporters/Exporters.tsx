import Account from '../accounts/Account';
import {Account as AccountType, ModalStatus} from "../../types";
import {getActionButtonRelatedProps} from '../accounts/Importers';

type ExporterProps = {
  exporters: AccountType[];
  isScraping: boolean;
  showModal: (AccountType, ModalStatus) => void;
}

function Exporters({ exporters, isScraping, showModal }: ExporterProps) {
    const { actionButtonIcon, modalStatus } = getActionButtonRelatedProps(isScraping, ModalStatus.SettingsExporter);
    return (
        <>
            {exporters.map(exporter => <Account key={exporter.id} account={exporter} actionButtonIcon={actionButtonIcon} actionButtonClickHandler={() => showModal(exporter, modalStatus)} />)}
        </>
    );
}



export default Exporters;
