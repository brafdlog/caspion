import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Image } from 'react-bootstrap';
import { Credentials } from '../../../../src/backend/commonTypes';
import {
  createSpreadsheet,
  electronGoogleOAuth2Connector,
  validateToken,
} from '../../eventsBridge';
import { GoogleSheetsConfig } from '../../types';
import styles from './EditFileExporter.module.css';
import SheetsDropdown from './google-sheets/SheetsDropdown';

enum Status {
  LOADING,
  LOGGED_IN,
  LOGIN,
  ERROR,
}

type LoginButtonProps = {
  onCredentialsChange: (credentials: Credentials) => void;
};
const LoginButton: React.FC<LoginButtonProps> = ({ onCredentialsChange }) => {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      const credentials = await electronGoogleOAuth2Connector();
      onCredentialsChange(credentials);
      setLoading(false);
    } catch (ex) {
      console.error(ex);
      setLoading(false);
      onCredentialsChange(null);
    }
  };

  return (
    <Button onClick={login} disabled={loading}>
      Login to Google
    </Button>
  );
};

const useTokenStatus = (credentials: Credentials) => {
  const [status, setStatus] = useState<Status>(Status.LOADING);

  useEffect(() => {
    validateToken(toJS(credentials))
      .then((valid) => setStatus(valid ? Status.LOGGED_IN : Status.LOGIN))
      .catch((e) => {
        console.error(e);
        setStatus(Status.ERROR);
      });
  }, [credentials]);

  return [status, setStatus] as const;
};

type EditSheetsExporterProps = {
  handleSave: (exporterConfig: GoogleSheetsConfig) => Promise<void>;
  exporterConfig: GoogleSheetsConfig;
};

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
    const isNewSheet = sheetsConfig.options.spreadsheetId.length < 30;
    if (isNewSheet) {
      setSendDisabled(true);
      console.log(
        'createSpreadsheet',
        sheetsConfig.options.credentials,
        sheetsConfig.options.spreadsheetId,
      );
      const spreadsheetId = await createSpreadsheet(
        toJS(sheetsConfig.options.spreadsheetId),
        toJS(sheetsConfig.options.credentials),
      );
      sheetsConfig.options.spreadsheetId = spreadsheetId;
    }
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
