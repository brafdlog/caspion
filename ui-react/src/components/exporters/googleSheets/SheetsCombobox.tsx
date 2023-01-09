import { Credentials } from 'google-auth-library/build/src/auth/credentials';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { getAllSpreadsheets } from '../../../eventsBridge';

interface SheetsComboboxProps {
  value: string;
  credentials: Credentials;
  changed: () => void;
}

const SheetsCombobox = ({ credentials, value, changed }:SheetsComboboxProps) => {

  const [userSpreadsheets, setUserSpreadsheets] = useState([]);
  const [spreadsheet, setSpreadsheet] = useState<string>(value);

  useEffect(() => {

    const getUserSpreadsheets = async () => {
      const data = await getAllSpreadsheets(credentials);
      setUserSpreadsheets(data);
    };

    getUserSpreadsheets();
  }, [credentials]);

  const handleChange = (event) => {
    setSpreadsheet(event.target.value);
    changed();
  };

  return (
        <Form.Select value={spreadsheet || ''} onChange={handleChange}>
          {userSpreadsheets.map(({ name, id }) => (
          <option key={id} value={id}>{name}</option>
          ))}
        </Form.Select>
  );
};

export default observer(SheetsCombobox);
