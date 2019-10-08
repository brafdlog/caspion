/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Edit, Save } from '@material-ui/icons';
import styles from './FinancialAccountConfig.scss';
import { FINANCIAL_COMPANIES_CONFIG } from '../../../constants/financialCompaniesConfig';

const FinancialAccountConfig = props => {
  const [editing, setEditing] = useState(false);
  const [companyId, setCompanyId] = useState(props.companyId);
  const [username, setUsername] = useState(props.credentials.username);
  const [password, setPassword] = useState(props.credentials.password);
  const companyMetadata = FINANCIAL_COMPANIES_CONFIG[companyId];

  useEffect(() => {
    setCompanyId(props.companyId);
    setUsername(props.credentials.username);
    setPassword(props.credentials.password);
  }, [props.companyId, props.credentials.username, props.credentials.password]);

  function saveChanges() {
    props.updateFinancialAccount({ companyId, credentials: { username, password } });
    setEditing(false);
  }
  return (
    <div className={styles.wrapper}>
      <Avatar className={styles.logo} src={companyMetadata.logoImageSrc} />
      <span className={styles.companyName}>{companyMetadata.displayName}</span>
      {editing ? (
        <>
          <input value={username} onChange={e => setUsername(e.target.value)} />
          <input value={password} type="password" onChange={e => setPassword(e.target.value)} />
          <Save onClick={saveChanges} />
        </>
      ) : (
        <>
          <span>{username}</span>
          <span>{password && '*'.repeat(password.length)}</span>
          <Edit onClick={() => setEditing(!editing)} />
        </>
      )}
    </div>
  );
};

export default FinancialAccountConfig;
