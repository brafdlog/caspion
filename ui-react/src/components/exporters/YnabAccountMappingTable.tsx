import React, { useState } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
import BootstrapTable from 'react-bootstrap-table-next';
import { YnabConfig } from "../../types";
import { Button } from 'react-bootstrap';

type AccountNumberToYnabAccountIdMappingObject = YnabConfig["options"]["accountNumbersToYnabAccountIds"];

type YnabAccountMappingTableProps = {
    accountNumberToYnabIdMapping: AccountNumberToYnabAccountIdMappingObject,
    onUpdate: (accountNumberToYnabIdMapping: AccountNumberToYnabAccountIdMappingObject) => void
}

type AccountMappingArray = { accountNumber: string, ynabAccountId: string, index?: number }[];

const YnabAccountMappingTable = ({ accountNumberToYnabIdMapping, onUpdate }: YnabAccountMappingTableProps) => {
    const [accountMappingArray, setAccountMappingArray] = useState<AccountMappingArray>(accountMappingObjectToArray(accountNumberToYnabIdMapping))

    const columns = [{
        dataField: 'index',
        text: '#',
        hidden: true
    }, {
        dataField: 'accountNumber',
        text: 'Account number',
        editor: {
        }
    }, {
        dataField: 'ynabAccountId',
        text: 'Ynab account id',
        editor: {
        }
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
}

function accountMappingObjectToArray(accountNumbersToYnabAccountIds: AccountNumberToYnabAccountIdMappingObject): AccountMappingArray {
    return Object.keys(accountNumbersToYnabAccountIds).map((accountNumber, index) => {
        return {
            index,
            accountNumber,
            ynabAccountId: accountNumbersToYnabAccountIds[accountNumber]
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

export default YnabAccountMappingTable;