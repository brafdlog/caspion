// ui-react\src\components\exporters\EditSheetsExporter.tsx

import React, { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { ipcHandlers } from '../../eventsBridge';
import { Exporter, GoogleSheetsConfig } from '../../types';
import { legalPath, required } from '../../utils/validations';

type EditSheetsExporterProps = {
  handleSave: (exporterConfig: Exporter | GoogleSheetsConfig) => Promise<void>;
  exporter: Exporter;
};

export default function EditSheetsExporter({
  handleSave,
  exporter,
}: EditSheetsExporterProps) {
  const [spreadsheet, setSpreadsheet] = useState<string | null>(null);
  const [isNewSpreadsheet, setIsNewSpreadsheet] = useState<boolean>(false);
  const [userSpreadsheets, setUserSpreadsheets] = useState<string[]>([]);
  const [validated, setValidated] = useState<boolean>(false);
  const [changed, setChanged] = useState<boolean>(false);

  useEffect(() => {
    const fetchSpreadsheets = async () => {
      const spreadsheets = await ipcHandlers.getAllSpreadsheets();
      setUserSpreadsheets(spreadsheets);
    };
    fetchSpreadsheets();
  }, []);

  useEffect(() => {
    const existedSpreadsheet = userSpreadsheets.find(
      (id) => id === spreadsheet,
    );
    setIsNewSpreadsheet(spreadsheet && !existedSpreadsheet);
  }, [spreadsheet, userSpreadsheets]);

  const handleSpreadsheetChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSpreadsheet(event.target.value);
    setChanged(true);
  };

  const handleSaveClick = async () => {
    if (validated && changed) {
      await handleSave({
        ...exporter,
        options: {
          ...exporter.options,
          spreadsheetId: spreadsheet,
        },
      });
      setChanged(false);
    }
  };

  return (
    <Form>
      <Form.Group controlId="spreadsheet">
        <Form.Label>Spreadsheet</Form.Label>
        <Form.Control
          type="text"
          value={spreadsheet}
          onChange={handleSpreadsheetChange}
          isInvalid={!legalPath(spreadsheet)}
        />
      </Form.Group>
      {isNewSpreadsheet && (
        <Alert variant="info">Will create a new spreadsheet</Alert>
      )}
      <Button
        variant="primary"
        disabled={!validated || !changed}
        onClick={handleSaveClick}
      >
        Save
      </Button>
    </Form>
  );
}
