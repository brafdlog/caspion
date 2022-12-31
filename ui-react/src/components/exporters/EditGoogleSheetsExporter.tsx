import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Form
} from 'react-bootstrap';
import { Prev } from 'react-bootstrap/esm/PageItem';
import {
  googleLogin,
  validateToken,
  createSpreadsheet,
} from '../../eventsBridge';
import {
  Credentials,
  Exporter,
  GoogleSheetsConfig,
  OutputVendorName,
} from '../../types';
import SheetsCombobox from './SheetsCombobox';
import styles from './EditGoogleSheetsExporter.module.css';

enum Status {
  LOADING,
  LOGGED_IN,
  LOGIN,
  ERROR,
}

type EditGoogleSheetsExporterProps = {
  handleSave: (exporter: Exporter) => Promise<void>;
  exporter: Exporter;
};

function EditGoogleSheetsExporter({
  exporter,
  handleSave,
}: EditGoogleSheetsExporterProps) {
  const [status, setStatus] = useState<Status>(Status.LOADING);
  const [errorMessage, SetErrorMessage] = useState();
  const [readyToSave, setReadyToSave] = useState(false);

  // const dataToReturn = setupExporterConfigForm(OutputVendorName.GOOGLE_SHEETS);
  const [exporterConfig, setExporterConfig] = useState<GoogleSheetsConfig>(
    exporter as GoogleSheetsConfig
  );

  useEffect(() => {
    const validate = async () => {
      // const valid = await validateToken(exporterConfig?.options?.credentials);
      // setStatus(valid ? Status.LOGGED_IN : Status.LOGIN);
    };

    try {
      validate();
    } catch (ex) {
      setStatus(Status.ERROR);
      SetErrorMessage(ex.message);
    }
  }, [exporterConfig.options.credentials]);

  const login = async () => {
    try {
      setStatus(Status.LOADING);

      const credentials = await googleLogin();
      setExporterConfig((prevExport) => ({
        ...prevExport,
        options: { ...prevExport.options, credentials },
      }));

      setStatus(Status.LOGGED_IN);
    } catch (ex) {
      setStatus(Status.ERROR);
      SetErrorMessage(ex.message ?? ex);
    }
  };

  const save = async () => {
    const isNewSheet = exporterConfig.options.spreadsheetId.length < 30;
    if (isNewSheet) {
      setStatus(Status.LOADING);
      const spreadsheetId = await createSpreadsheet(
        exporterConfig.options.spreadsheetId,
        exporterConfig.options.credentials
      );
      setExporterConfig((prevExport) => ({
        ...prevExport,
        options: { ...prevExport.options, spreadsheetId },
      }));

      setStatus(Status.LOGGED_IN);
    }
    // return dataToReturn.submit();
  };

  const handleActiveChange = (e) => {
    setExporterConfig((prevExport) => ({
      ...prevExport,
      active: e.target.checked
    }));
  };

  return (
    <div className={styles.container}>
      {status === Status.LOADING && (
        <Button variant="dark" onClick={login}>
          Login to Google
        </Button>
      )}
      {status === Status.ERROR && (
        <Alert variant="danger">{errorMessage}</Alert>
      )}
      {status === Status.LOGGED_IN && (
        <>
          <Card className={styles.card}>
            <Card.Body className={styles.cardBody}>
              <Form className={styles.form}>
                <Form.Check
                  type="checkbox"
                  checked={exporterConfig?.active}
                  onChange={handleActiveChange}
                  label="Active"
                  className="mb-3"
                />
                <SheetsCombobox
                  credentials={exporterConfig?.options?.credentials}
                />
                <Button
                  disabled={!readyToSave}
                  variant="dark"
                  onClick={save}
                  className="mt-3"
                >
                  Save
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
    // <p>ההגדרות של גוגל שיטס עוד לא זמינות בממשק החדש. נא לעבור לממשק הישן כדי להגדיר</p>
  );
}

export default EditGoogleSheetsExporter;
