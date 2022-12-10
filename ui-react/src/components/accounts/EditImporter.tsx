import styles from './EditImporter.module.css';
import { Importer } from '../../types';
import { IMPORTERS_LOGIN_FIELDS, LOGIN_FIELD_DISPLAY_NAMES, LOGIN_FIELD_MIN_LENGTH } from "../../accountMetadata";
import { useState } from "react";
import { Button, Card, Form, Image } from "react-bootstrap";

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
    const [active, setActive] = useState<boolean>(importer.active);
    const [validated, setValidated] = useState(false);
    const onSaveClicked = async () => {
        await handleSave({
            ...importer,
            active,
            loginFields
        });
    };
    const checkFieldValidity = (loginFieldName: string, value) : boolean => {
        return value.length >= LOGIN_FIELD_MIN_LENGTH[loginFieldName];
    };
    const onLoginFieldChanged = (loginFieldName: string, value) => {
        setLoginFields((loginFields) => {
            const updatedLoginFields = {...loginFields, [loginFieldName]: value};

            setValidated(Object.entries(updatedLoginFields).every(([key, value]) => checkFieldValidity(key, value)))
            return updatedLoginFields;
        });
    };

    const onActiveChanged = () => {
        setActive(!active);
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
                    <Form.Check
                        type="switch"
                        onChange={onActiveChanged}
                        label="פעיל"
                        checked={active}
                    />
                    <div className={styles.actionButtonsWrapper}>
                        <Button variant="danger" onClick={() => handleDelete(importer.id)}>מחק</Button>
                        <Button variant="primary" onClick={onSaveClicked} disabled={!validated}>שמור</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    </div>
  );
}
