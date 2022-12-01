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
    const onSaveClicked = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            await handleSave({
                ...importer,
                active,
                loginFields
            });
        }        
        
        setValidated(true);
    };
    const onLoginFieldChanged = (loginFieldName: string, value) => {
        setLoginFields({
            ...loginFields,
            [loginFieldName]: value
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
                <Form noValidate validated={validated} onSubmit={onSaveClicked}>
                    {IMPORTERS_LOGIN_FIELDS[importer.companyId].map(loginField => (
                        <Form.Group key={loginField} className={styles.formGroup} controlId={loginField}>
                            <Form.Control placeholder={LOGIN_FIELD_DISPLAY_NAMES[loginField]} type={loginField === 'password' ? 'password' : '' } value={loginFields[loginField]} onChange={(event) => onLoginFieldChanged(loginField, event.target.value)} required minLength={LOGIN_FIELD_MIN_LENGTH[loginField]} />
                            <Form.Control.Feedback type="invalid">נא להכניס {LOGIN_FIELD_DISPLAY_NAMES[loginField]} עם לפחות {LOGIN_FIELD_MIN_LENGTH[loginField]} תוים</Form.Control.Feedback>
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
                        <Button variant="primary" type="submit">שמור</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    </div>
  );
}
