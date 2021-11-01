import styles from './CreateOrEditAccount.module.css';
import { v4 as uuidv4 } from 'uuid';
import { Importer } from '../../types';
import { importers, IMPORTERS_LOGIN_FIELDS, LOGIN_FIELD_DISPLAY_NAMES } from "../../accountMetadata";
import Account from "./Account";
import { useState } from "react";
import {Button, Card, Form, Image} from "react-bootstrap";

type CreateOrEditAccountProps = {
    handleSave: (importer: Importer) => Promise<void>;
    handleDelete?: (id: string) => Promise<void>;
    account?: Importer;
}

export default function CreateOrEditAccount({
  handleSave,
  handleDelete,
  account
}: CreateOrEditAccountProps) {
    const [importerToCreate, setImporterToCreate] = useState<Importer | undefined>(account);
    const [loginFields, setLoginFields] = useState<Record<string, string>>(account?.loginFields || {});
    const handleChooseAccount = (account: Importer) => setImporterToCreate({ ...account, id: uuidv4() });
    const onSaveClicked = async () => {
        importerToCreate.loginFields = loginFields;
        await handleSave(importerToCreate);
    };
    const onLoginFieldChanged = (loginFieldName: string, value) => {
        setLoginFields({
            ...loginFields,
            [loginFieldName]: value
        });
    };
  return (
    <div className={styles.container}>
        {
            !importerToCreate && (
                <div className={styles.accountSelectionWrapper}>
                {importers.map(importer => <div className={styles.accountWrapper} onClick={() => handleChooseAccount(importer)}><Account account={importer} /></div>)}
                </div>
            )
        }
        {
            importerToCreate && (
                <Card className={styles.card}>
                    <Image className={styles.logo} src={importerToCreate?.logo} roundedCircle width={100} height={100} />
                    <Card.Body className={styles.cardBody}>
                        <Form>
                            {IMPORTERS_LOGIN_FIELDS[importerToCreate.companyId].map(loginField => (
                                <Form.Group className={styles.formGroup} controlId={loginField}>
                                    <Form.Control placeholder={LOGIN_FIELD_DISPLAY_NAMES[loginField]} type={loginField === 'password' ? 'password' : '' } value={loginFields[loginField]} onChange={(event) => onLoginFieldChanged(loginField, event.target.value)} />
                                </Form.Group>
                            ))}
                        </Form>
                        <div className={styles.actionButtonsWrapper}>
                            { handleDelete && <Button variant="danger" onClick={() => handleDelete(importerToCreate.id)}>מחק</Button> }
                            <Button variant="primary" onClick={onSaveClicked}>שמור</Button>
                        </div>

                    </Card.Body>
                </Card>
            )
        }
    </div>
  );
}
