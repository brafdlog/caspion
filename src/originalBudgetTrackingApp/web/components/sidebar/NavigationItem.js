import React from 'react';
import styles from './NavigationItem.scss';

const NavigationItem = ({ title, Icon }) => (
  <div className={styles.navItem}>
    <Icon />
    <p className={styles.navItemText}>{title}</p>
  </div>
);

export default NavigationItem;
