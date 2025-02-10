import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { type YnabAccountDataType, type YnabConfig } from '../../types';

type AccountNumberToYnabAccountIdMappingObject = YnabConfig['options']['accountNumbersToYnabAccountIds'];

interface YnabAccountMappingTableProps {
  accountNumberToYnabIdMapping: AccountNumberToYnabAccountIdMappingObject;
  ynabAccountData?: YnabAccountDataType;
  budgetId: string;
  onUpdate: (accountNumberToYnabIdMapping: AccountNumberToYnabAccountIdMappingObject) => void;
}

type AccountMappingArray = {
  accountNumber: string;
  ynabBudgetId: string;
  ynabAccountId: string;
  index?: number;
}[];

const YnabAccountMappingTable = ({
  accountNumberToYnabIdMapping,
  onUpdate,
  ynabAccountData,
  budgetId,
}: YnabAccountMappingTableProps) => {
  const [accountMappingArray, setAccountMappingArray] = useState<AccountMappingArray>(
    accountMappingObjectToArray(accountNumberToYnabIdMapping),
  );

  const columns = [
    {
      dataField: 'index',
      text: '#',
      hidden: true,
    },
    {
      dataField: 'accountNumber',
      text: 'Account number',
      editor: {
        type: Type.TEXT,
      },
    },
    {
      dataField: 'ynabBudgetId',
      text: 'Ynab budget id',
      editor: {
        type: Type.SELECT,
        getOptions: () => {
          return ynabAccountData?.ynabAccountData?.budgets.map((ynabBudget) => {
            return {
              label: ynabBudget.name,
              value: ynabBudget.id,
            };
          });
        },
      },
    },
    {
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
    },
  ];

  const cellEdit = cellEditFactory({
    mode: 'click',
    blurToSave: true,
    afterSaveCell,
  });

  function afterSaveCell() {
    const mappingObject = accountMappingArrayToObject(accountMappingArray);
    onUpdate(mappingObject);
  }

  function addAccountMapping() {
    setAccountMappingArray([
      ...accountMappingArray,
      {
        accountNumber: '12345678',
        ynabBudgetId: '##########',
        ynabAccountId: '##########',
        index: accountMappingArray.length,
      },
    ]);
  }

  return (
    <>
      <BootstrapTable keyField="index" data={accountMappingArray} columns={columns} cellEdit={cellEdit} />
      <Button variant="info" onClick={addAccountMapping}>
        +
      </Button>
    </>
  );
};

function accountMappingObjectToArray(
  accountNumbersToYnabAccountIds: AccountNumberToYnabAccountIdMappingObject,
): AccountMappingArray {
  return Object.keys(accountNumbersToYnabAccountIds).map((accountNumber, index) => {
    return {
      index,
      accountNumber,
      ynabBudgetId: accountNumbersToYnabAccountIds[accountNumber].ynabBudgetId,
      ynabAccountId: accountNumbersToYnabAccountIds[accountNumber].ynabAccountId,
    };
  });
}

function accountMappingArrayToObject(accountMappingArray: AccountMappingArray) {
  const mappingObject: AccountNumberToYnabAccountIdMappingObject = {};
  accountMappingArray.forEach(({ accountNumber, ynabBudgetId, ynabAccountId }) => {
    mappingObject[accountNumber] = { ynabBudgetId, ynabAccountId };
  });
  return mappingObject;
}

export default observer(YnabAccountMappingTable);
