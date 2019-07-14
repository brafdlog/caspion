import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Config from './pages/config/Config';
import Sidebar from './sidebar/Sidebar';
import styles from './Root.css';

const Root = () => (
  <div className={styles.appWrapper}>
    <HashRouter>
      <Sidebar />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/config" component={Config} />
    </HashRouter>
  </div>
);

export default Root;
