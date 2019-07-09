import React from 'react';
import { Home, Settings } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import styles from './Sidebar.scss';

const Sidebar = () => (
  <div className={styles.sidebar}>
    <div className={styles.navigationContainer}>
      <Link to="/">
        <NavigationItem title="מסך הבית" Icon={Home} />
      </Link>
      <Link to="/config">
        <NavigationItem title="הגדרות" Icon={Settings} />
      </Link>
    </div>
  </div>
);

export default Sidebar;
