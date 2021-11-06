import styles from './EditImporter.module.css';
import { Importer } from '../../types';
import { IMPORTERS_LOGIN_FIELDS, LOGIN_FIELD_DISPLAY_NAMES } from "../../accountMetadata";
import { useState } from "react";
import {Button, Card, Form, Image} from "react-bootstrap";

type EditImporterProps = {
    handleSave: (importer: Importer) => Promise<void>;
    handleDelete: (id: string) => Promise<void>;
    importer: Importer;
}

export default function EditImporter({
  handleSave,
  handleDelete,
  importer
}: EditImporterProps) {
    const [loginFields, setLoginFields] = useState<Record<string, string>>(importer.loginFields || {});
    const onSaveClicked = async () => {
        await handleSave({
            ...importer,
            loginFields
        });
    };
    const onLoginFieldChanged = (loginFieldName: string, value) => {
        setLoginFields({
            ...loginFields,
            [loginFieldName]: value
        });
    };
  return (
    <div className={styles.container}>
        <Card className={styles.card}>
            <Image className={styles.logo} src={importer.logo} roundedCircle width={100} height={100} />
            <Card.Body className={styles.cardBody}>
                <Form>
                    {IMPORTERS_LOGIN_FIELDS[importer.companyId].map(loginField => (
                        <Form.Group key={loginField} className={styles.formGroup} controlId={loginField}>
                            <Form.Control placeholder={LOGIN_FIELD_DISPLAY_NAMES[loginField]} type={loginField === 'password' ? 'password' : '' } value={loginFields[loginField]} onChange={(event) => onLoginFieldChanged(loginField, event.target.value)} />
                        </Form.Group>
                    ))}
                </Form>
                <div className={styles.actionButtonsWrapper}>
                    <Button variant="danger" onClick={() => handleDelete(importer.id)}>מחק</Button>
                    <Button variant="primary" onClick={onSaveClicked}>שמור</Button>
                </div>

            </Card.Body>
        </Card>
    </div>
  );
}
