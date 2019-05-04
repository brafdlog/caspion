import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab/index';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import { ipcRenderer } from 'electron';
import styles from './HomePage.css';
import events from '../../../constants/events';

const STATUSES = {
  idle: 'idle',
  inProgress: 'inProgress',
  done: 'done',
  error: 'error'
};

export default class HomePage extends Component {
  state = {
    status: STATUSES.idle
  };

  componentDidMount() {
    ipcRenderer.on(events.scraping.done, (event, arg) =>
      this.setState({
        status: STATUSES.done,
        scraperPayload: arg
      })
    );
    ipcRenderer.on(events.scraping.error, (event, arg) =>
      this.setState({
        status: STATUSES.error,
        error: arg
      })
    );
  }

  runScraper() {
    this.setState({ status: STATUSES.inProgress });
    ipcRenderer.send(events.scraping.start);
  }

  render() {
    const { status, scraperPayload, error } = this.state;
    const isInProgress = status === STATUSES.inProgress;
    const isDone = status === STATUSES.done;
    const isError = status === STATUSES.error;
    if (isError) {
      return (
        <>
          <div>failed! 😭😭😭😭</div>
          <div>{error}</div>
        </>
      );
    }
    if (isDone) {
      return (
        <>
          <div>yay!</div>
          <div>{scraperPayload}</div>
        </>
      );
    }
    return (
      <div className={styles.container} data-tid="container">
        <h2>איפה הכסף?</h2>
        <Fab
          disabled={isInProgress}
          variant="extended"
          onClick={() => this.runScraper()}
          size="large"
          color="primary"
        >
          {isInProgress ? <CircularProgress /> : null}
          תראה לי ת׳כסף <span role="img">💸</span>
        </Fab>
      </div>
    );
  }
}
