/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Edit, Save } from '@material-ui/icons';
import styles from './FinancialAccountConfig.scss';

// 'hapoalim', 'leumi', 'discount', 'otsarHahayal', 'visaCal', 'leumiCard', 'isracard', 'amex'
const COMPANY_ID_TO_METADATA = {
  leumi: {
    logoImageSrc:
      'https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/79/50/3b/79503b03-e956-60a4-f9e8-aaeffc388b06/AppIcon-0-1x_U007emarketing-0-0-85-220-0-4.png/246x0w.jpg',
    name: 'לאומי'
  },
  visaCal: {
    logoImageSrc: 'https://cdn.freebiesupply.com/logos/large/2x/visa-2-logo-png-transparent.png',
    name: 'ויזה כאל'
  },
  leumiCard: {
    logoImageSrc:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/e6/d3/40/e6d34009-8df4-0755-7b78-236562749bc3/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-3.png/246x0w.jpg',
    name: 'לאומי קארד - max'
  }
};

const FinancialAccountConfig = props => {
  const [editing, setEditing] = useState(false);
  const [companyId, setCompanyId] = useState(props.companyId);
  const [username, setUsername] = useState(props.credentials.username);
  const [password, setPassword] = useState(props.credentials.password);
  const companyMetadata = COMPANY_ID_TO_METADATA[companyId];

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
      <span className={styles.companyName}>{companyMetadata.name}</span>
      {editing ? (
        <>
          <input value={username} onChange={e => setUsername(e.target.value)} />
          <input value={password} type="password" onChange={e => setPassword(e.target.value)} />
          <Save onClick={saveChanges} />
        </>
      ) : (
        <>
          <span>{username}</span>
          <span>{'*'.repeat(password.length)}</span>
          <Edit onClick={() => setEditing(!editing)} />
        </>
      )}
    </div>
  );
};

export default FinancialAccountConfig;
