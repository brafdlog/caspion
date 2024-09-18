import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Button, Card, Form, Image } from 'react-bootstrap';
import { type GoogleSheetsConfig } from '../../../types';
import styles from '../EditFileExporter.module.css';
import LoginButton from './LoginButton';
import SheetsDropdown from './SheetsDropdown';
import { Status, createSheetIfNew, useTokenStatus } from './hooks';

interface EditSheetsExporterProps {
  handleSave: (exporterConfig: GoogleSheetsConfig) => Promise<void>;
  exporterConfig: GoogleSheetsConfig;
}

const EditSheetsExporter: React.FC<EditSheetsExporterProps> = ({
  handleSave,
  exporterConfig,
}) => {
  const [sheetsConfig, setSheetsConfig] = useState<GoogleSheetsConfig>(
    toJS<GoogleSheetsConfig>(exporterConfig),
  );
  const [loginStatus] = useTokenStatus(sheetsConfig.options.credentials);
  const [sendDisabled, setSendDisabled] = useState(false);

  const handleActiveChange = () => {
    setSheetsConfig((prev) => ({
      ...prev,
      active: !prev.active,
    }));
  };

  const handleSheetIdChange = (sheetId: string) => {
    setSheetsConfig((prev) => ({
      ...prev,
      options: {
        ...prev.options,
        spreadsheetId: sheetId,
      },
    }));
  };

  const handleSaveClick = async () => {
    setSendDisabled(true);
    const newId = await createSheetIfNew(
      sheetsConfig.options.spreadsheetId,
      sheetsConfig.options.credentials,
    );
    sheetsConfig.options.spreadsheetId = newId;
    await handleSave(sheetsConfig);
  };

  if (loginStatus === Status.LOADING) {
    return <div>טוען גליונות מגוגל</div>;
  }

  if (loginStatus === Status.ERROR) {
    return <div>שגיאת התחברות לגוגל</div>;
  }

  if (loginStatus === Status.LOGIN) {
    const updateCredentials = (credentials: Credentials) => {
      setSheetsConfig((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          credentials,
        },
      }));
    };
    return <LoginButton onCredentialsChange={updateCredentials} />;
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Image
          className={styles.logo}
          src={exporterConfig.logo}
          roundedCircle
          width={100}
          height={100}
        />
        <Card.Body className={styles.cardBody}>
          <Form>
            <SheetsDropdown
              value={sheetsConfig.options.spreadsheetId}
              credentials={sheetsConfig.options.credentials}
              onChange={handleSheetIdChange}
            />
            <Form.Group controlId="exporterActive">
              <Form.Check
                type="switch"
                onChange={handleActiveChange}
                label="פעיל"
                checked={sheetsConfig.active}
              />
            </Form.Group>
          </Form>
          <div className={styles.actionButtonsWrapper}>
            <Button
              variant="primary"
              onClick={handleSaveClick}
              disabled={sendDisabled}
            >
              שמור
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default observer(EditSheetsExporter);
