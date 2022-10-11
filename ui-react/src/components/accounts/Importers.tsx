import logsIcon from '../../assets/card-text.svg';
import settingsIcon from '../../assets/gear.svg';
import Account from './Account';
import NewAccount from './NewAccount';
import { ModalStatus, Account as AccountType } from "../../types";

type ImportersProps = {
    accounts: AccountType[];
    isScraping: boolean;
    showModal: (AccountType, ModalStatus) => void;
    handleNewAccountClicked?: () => void
}

function Importers({ accounts, isScraping, showModal, handleNewAccountClicked }: ImportersProps) {
    const { actionButtonIcon, modalStatus } = getActionButtonRelatedProps(isScraping);
    return (
        <>
            {
                accounts.map(account => {
                    return <Account key={account.id} account={account} actionButtonIcon={actionButtonIcon} actionButtonClickHandler={() => showModal(account, modalStatus)} />
                })
            }
            {handleNewAccountClicked ? (
                <NewAccount onClick={handleNewAccountClicked} />
            ) : null
            }
        </>
    );
}


export function getActionButtonRelatedProps(isScraping, settingsModalStatus?: ModalStatus) {
    let actionButtonIcon, modalStatus;
    if (isScraping) {
        actionButtonIcon = logsIcon;
        modalStatus = ModalStatus.Logs;
    } else {
        actionButtonIcon = settingsIcon;
        modalStatus = settingsModalStatus || ModalStatus.ImporterSettings;
    }
    return {
        actionButtonIcon,
        modalStatus
    }
}


export default Importers;
