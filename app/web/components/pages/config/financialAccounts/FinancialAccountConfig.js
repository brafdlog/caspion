/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Edit, Save, Delete } from '@material-ui/icons';
import { Select, MenuItem, Checkbox } from '@material-ui/core';
import styles from './FinancialAccountConfig.scss';
import { FINANCIAL_COMPANIES_CONFIG } from '../../../../constants/financialCompaniesConfig';

const FinancialAccountConfig = props => {
  const [editing, setEditing] = useState(false);
  const [companyId, setCompanyId] = useState(props.companyId);
  const [username, setUsername] = useState(props.credentials.username);
  const [password, setPassword] = useState(props.credentials.password);
  const [isActive, setIsActive] = useState(props.active);
  const companyMetadata = FINANCIAL_COMPANIES_CONFIG[companyId];

  useEffect(() => {
    setCompanyId(props.companyId);
    setUsername(props.credentials.username);
    setPassword(props.credentials.password);
  }, [props.companyId, props.credentials.username, props.credentials.password]);

  function saveChanges() {
    props.updateFinancialAccount({ companyId, credentials: { username, password }, active: isActive });
    setEditing(false);
  }
  return (
    <div className={styles.wrapper}>
      <Avatar className={styles.logo} src={companyMetadata.logoImageSrc} />
      <span className={styles.companyName}>{companyMetadata.displayName}</span>
      {editing ? (
        <>
          <Select
            value={companyId}
            onChange={e => setCompanyId(e.target.value)}
            inputProps={{
              name: 'age',
              id: 'age-simple'
            }}
          >
            {Object.values(FINANCIAL_COMPANIES_CONFIG).map(financialCompanyConfig => (
              <MenuItem value={financialCompanyConfig.id}>{financialCompanyConfig.displayName}</MenuItem>
            ))}
          </Select>
          <input value={username} onChange={e => setUsername(e.target.value)} />
          <input value={password} type="password" onChange={e => setPassword(e.target.value)} />
          <Checkbox checked={isActive} onChange={() => setIsActive(!isActive)} color="primary" />
          <Save onClick={saveChanges} />
        </>
      ) : (
        <>
          <span>{username}</span>
          <span>{password && '*'.repeat(password.length)}</span>
          <Checkbox disabled checked={isActive} color="primary" />
          <Edit onClick={() => setEditing(!editing)} />
          <Delete onClick={props.deleteFinancialAccount} />
        </>
      )}
    </div>
  );
};

export default FinancialAccountConfig;
