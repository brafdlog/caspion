import { createSpreadsheet, getAllUserSpreadsheets, validateToken } from '#preload';
import { toJS } from 'mobx';
import { useEffect, useState } from 'react';
import { type Credentials, type Spreadsheet } from '/@/types';

export enum Status {
  LOADING,
  LOGGED_IN,
  LOGIN,
  ERROR,
}

export const useUserSpreadsheets = (credentials: Credentials) => {
  const [userSpreadsheets, setUserSpreadsheets] = useState<Spreadsheet[]>([]);

  useEffect(() => {
    getAllUserSpreadsheets(toJS(credentials))
      .then(spreadsheets => setUserSpreadsheets(spreadsheets))
      .catch(err => {
        console.error(err);
        setUserSpreadsheets([]);
      });
  }, [credentials]);

  return userSpreadsheets;
};

export const useTokenStatus = (credentials: Credentials) => {
  const [status, setStatus] = useState<Status>(Status.LOADING);

  useEffect(() => {
    validateToken(toJS(credentials))
      .then(valid => setStatus(valid ? Status.LOGGED_IN : Status.LOGIN))
      .catch(e => {
        console.error(e);
        setStatus(Status.ERROR);
      });
  }, [credentials]);

  return [status, setStatus] as const;
};

export const createSheetIfNew = async (spreadsheetId: string, credentials: Credentials) => {
  if (spreadsheetId.length >= 30) return spreadsheetId;

  const newId = await createSpreadsheet(toJS(spreadsheetId), toJS(credentials));
  return newId;
};
