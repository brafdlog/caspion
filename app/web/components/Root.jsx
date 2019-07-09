import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Config from './pages/Config';
import Sidebar from './sidebar/Sidebar';
import styles from './Root.css';

export default class Root extends Component {
  render() {
    return (
      <div className={styles.appWrapper}>
        <HashRouter>
          <Sidebar />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/config" component={Config} />
        </HashRouter>
      </div>
    );
  }
}
