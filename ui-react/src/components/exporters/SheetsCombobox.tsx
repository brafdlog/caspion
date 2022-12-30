import React, { useEffect, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { Credentials } from '../../types';

const SheetsCombobox = (credentials: Credentials, value: String) => {
  const [isNewSpreadsheet, setIsNewSpreadsheet] = useState(false);

  useEffect(() => {
    // const x = await getAllSpreadsheets(createClient(credentials));
    // setUserSpreadsheets(x);
  }, []);

  const handleOptionChangeEvent = (propertyName, event) => {
    // updateOptionsState({ [propertyName]: event.target.value });
  };

  return (
    <div>
      <Form>
        <Form.Select
          onChange={(event) => handleOptionChangeEvent('budgetId', event)}
        ></Form.Select>
      </Form>
      {isNewSpreadsheet && (
        <Alert variant="info">Will create a new spreadsheet</Alert>
      )}
    </div>
  );
};

export default SheetsCombobox;
