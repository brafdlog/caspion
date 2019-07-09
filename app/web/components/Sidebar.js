import React from 'react';
import { Home, Settings } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import NavigationItem from './NavigationItem';
import styles from './Sidebar.scss';

const Sidebar = props => (
  <div className={styles.sidebar}>
    <h2>Sidebar </h2>
    <code>{JSON.stringify(props, null, 4)}</code>
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
