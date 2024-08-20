import React, { useState } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { type YnabConfig } from '../../types';

type AccountNumberToYnabAccountIdMappingObject = YnabConfig['options']['accountNumbersToYnabAccountIds'];

interface YnabAccountMappingTableProps {
    accountNumberToYnabIdMapping: AccountNumberToYnabAccountIdMappingObject;
    ynabAccountData?: YnabAccountDataType;
    budgetId: string
    onUpdate: (accountNumberToYnabIdMapping: AccountNumberToYnabAccountIdMappingObject) => void;
}

type AccountMappingArray = { accountNumber: string, ynabAccountId: string, index?: number }[];

const YnabAccountMappingTable = ({
  accountNumberToYnabIdMapping, onUpdate, ynabAccountData, budgetId,
}: YnabAccountMappingTableProps) => {
  const [accountMappingArray, setAccountMappingArray] = useState<AccountMappingArray>(accountMappingObjectToArray(accountNumberToYnabIdMapping));

  const columns = [{
    dataField: 'index',
    text: '#',
    hidden: true,
  }, {
    dataField: 'accountNumber',
    text: 'Account number',
    editor: {
    },
  }, {
    dataField: 'ynabAccountId',
    text: 'Ynab account id',
    editor: {
      type: Type.SELECT,
      getOptions: () => {
        return ynabAccountData?.ynabAccountData?.accounts
          .filter((ynabAccount) => ynabAccount.active && ynabAccount.budgetId === budgetId)
          .map((ynabAccount) => {
            return {
              label: ynabAccount.name,
              value: ynabAccount.id,
            };
          });
      },
    },
  }];

  const cellEdit = cellEditFactory({ mode: 'click', blurToSave: true, afterSaveCell });

  function afterSaveCell() {
    const mappingObject = accountMappingArrayToObject(accountMappingArray);
    onUpdate(mappingObject);
  }

  function addAccountMapping() {
    setAccountMappingArray([...accountMappingArray, { accountNumber: '12345678', ynabAccountId: '##########', index: accountMappingArray.length }]);
  }

  return (
        <>
            <BootstrapTable keyField='index' data={accountMappingArray} columns={columns} cellEdit={ cellEdit } />
            <Button variant="info" onClick={addAccountMapping}>+</Button>
        </>
  );
};

function accountMappingObjectToArray(accountNumbersToYnabAccountIds: AccountNumberToYnabAccountIdMappingObject): AccountMappingArray {
  return Object.keys(accountNumbersToYnabAccountIds).map((accountNumber, index) => {
    return {
      index,
      accountNumber,
      ynabAccountId: accountNumbersToYnabAccountIds[accountNumber],
    };
  });
}

function accountMappingArrayToObject(accountMappingArray: AccountMappingArray) {
  const mappingObject = {};
  accountMappingArray.forEach(({ accountNumber, ynabAccountId }) => {
    mappingObject[accountNumber] = ynabAccountId;
  });
  return mappingObject;
}

export default observer(YnabAccountMappingTable);
