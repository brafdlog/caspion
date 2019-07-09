import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Config from './Config';
import styles from './Root.css';

export default class Root extends Component {
  render() {
    return (
      <React.StrictMode>
        <div className={styles.appWrapper}>
          <HashRouter>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/config" component={Config} />
          </HashRouter>
        </div>
      </React.StrictMode>
    );
  }
}
