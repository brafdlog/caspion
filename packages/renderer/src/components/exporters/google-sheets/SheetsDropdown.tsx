import React, { useCallback, useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useUserSpreadsheets } from './hooks';
import { type Credentials } from '/@/types';

interface SheetsDropdownProps {
  credentials: Credentials;
  value: string;
  onChange: (value: string) => void;
}
const SheetsDropdown: React.FC<SheetsDropdownProps> = ({
  credentials,
  value,
  onChange,
}) => {
  const userSpreadsheets = useUserSpreadsheets(credentials);
  const existedSpreadsheet = useMemo(
    () => userSpreadsheets.find(({ id }) => id === value),
    [userSpreadsheets, value],
  );
  const selected = useMemo(() => {
    if (existedSpreadsheet) return [existedSpreadsheet];
    if (!value) return [];
    return [{ id: value, name: value, customOption: true }];
  }, [existedSpreadsheet, value]);

  const onSelectionChange = useCallback(
    (selections) => {
      if (selections[0]?.customOption) onChange(selections[0]?.name);
      else if (selections.length) onChange(selections[0]?.id);
      else onChange(null);
    },
    [onChange],
  );

  return (
    <Form.Group>
      <Form.Label>בחר גליון או הזן חדש</Form.Label>
      <Typeahead
        id="basic-typeahead-single"
        labelKey="name"
        onChange={onSelectionChange}
        options={userSpreadsheets}
        placeholder="בחר גליון"
        selected={selected}
        allowNew
        newSelectionPrefix="יצירת גליון חדש:"
      />
    </Form.Group>
  );
};

export default SheetsDropdown;
