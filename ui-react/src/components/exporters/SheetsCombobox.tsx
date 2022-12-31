import React, { useEffect, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { getAllSpreadsheets } from '../../eventsBridge';

const SheetsCombobox = (credentials: any, value: string) => {

  const [userSpreadsheets, setUserSpreadsheets] = useState([]);
  const [spreadsheet, setSpreadsheet] = useState<string>(value);
  const [isNewSpreadsheet, setIsNewSpreadsheet] = useState(false);

  useEffect(() => {

    const getUserSpreadsheets = async () => {
      const spreadsheets = await getAllSpreadsheets(credentials);
      setUserSpreadsheets(spreadsheets);
    };

    getUserSpreadsheets();
  }, [credentials]);

  useEffect(() => {
    if (value && !userSpreadsheets.find(({ id }) => id === value)) {
      setIsNewSpreadsheet(true);
    } else {
      setIsNewSpreadsheet(false);
    }
  }, [value, userSpreadsheets]);

  const handleChange = (event) => {
    setSpreadsheet(event.target.value);
  };

  return (
    <div>
        <Form.Select value={spreadsheet || ''} onChange={handleChange}>
          {userSpreadsheets.map(({ name, id }) => (
          <option key={id} value={id}>{name}</option>
          ))}
        </Form.Select>
      {isNewSpreadsheet && (
        <Alert variant="info" className='mt-3'>Will create a new spreadsheet</Alert>
      )}
    </div>
  );
};

export default SheetsCombobox;
