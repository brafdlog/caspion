import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Card, Form
} from 'react-bootstrap';
import { googleLogin, validateToken } from '../../eventsBridge';
import { Exporter, OutputVendorName } from '../../types';
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
  //  const exporter = ref(dataToReturn.exporter as GoogleSheetsConfig);

  useEffect(async () => {
    try {
      // exporter.options.credentials = await googleLogin();
      const credentials = await googleLogin();
      const valid = await validateToken(credentials);
      setStatus(valid ? Status.LOGGED_IN : Status.LOGIN);
    } catch (ex) {
      setStatus(Status.ERROR);
      SetErrorMessage(ex.message);
    }
  }, []);

  const login = async () => {
    try {
      setStatus(Status.LOADING);

      // exporter.options.credentials = await ElectronLogin(googleAuthData);

      setStatus(Status.LOGGED_IN);
    } catch (ex) {
      setStatus(Status.ERROR);
      SetErrorMessage(ex.message ?? ex);
    }
  };

  const save = async () => {
    // const isNewSheet = exporter.options.spreadsheetId.length < 30;
    // if (isNewSheet) {
    //   setStatus(Status.LOADING);
    //  const spreadsheetId = await createSpreadsheet(exporter.options.spreadsheetId, exporter.options.credentials);
    //   exporter.options.spreadsheetId = spreadsheetId;
    //   setStatus(Status.LOGGED_IN);
    // }
    // return dataToReturn.submit();
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
                <Form.Check type="checkbox" label="Active" className='mb-3'/>
                <SheetsCombobox />
                <Button disabled={!readyToSave} variant="dark" onClick={save} className='mt-3'>
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
