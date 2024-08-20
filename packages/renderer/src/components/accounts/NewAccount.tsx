import React from 'react';
import plusCircle from '../../assets/plus-circle.svg';
import styles from './NewAccount.module.css';

interface NewAccountProps {
  onClick: () => void
}

export default function NewAccount({
  onClick,
}: NewAccountProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      <img className={styles.image} src={plusCircle} alt={'חשבון חדש'} height={18} width={18} />
      <div className={styles.nameWrapper}>
        <div className={styles.name}>חשבון חדש</div>
      </div>
    </div>
  );
}
