import React, { Component } from 'react';
import Fab from '@material-ui/core/Fab/index';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import { ipcRenderer } from 'electron';
import styles from './HomePage.css';
import { jsonStringifyPretty } from '../../../utils';
import events from '../../../constants/events';

const SCRAPING_STATUS = {
  initial: 'initial',
  inProgress: 'inProgress',
  done: 'done',
  error: 'error'
};

export default class HomePage extends Component {
  state = {
    status: SCRAPING_STATUS.initial
  };

  componentDidMount() {
    ipcRenderer.on(events.scraping.done, (event, arg) =>
      this.setState({
        status: SCRAPING_STATUS.done,
        scraperPayload: arg
      })
    );
    ipcRenderer.on(events.scraping.error, (event, arg) =>
      this.setState({
        status: SCRAPING_STATUS.error,
        error: arg
      })
    );
  }

  runScraper() {
    this.setState({ status: SCRAPING_STATUS.inProgress });
    ipcRenderer.send(events.scraping.start);
  }

  render() {
    const { status, scraperPayload, error } = this.state;
    const isInProgress = status === SCRAPING_STATUS.inProgress;
    const isDone = status === SCRAPING_STATUS.done;
    const isError = status === SCRAPING_STATUS.error;
    if (isError) {
      return (
        <>
          <div>failed! 😭😭😭😭</div>
          <div>{jsonStringifyPretty(error)}</div>
        </>
      );
    }
    if (isDone) {
      return (
        <>
          <div>yay!</div>
          <div>{jsonStringifyPretty(scraperPayload)}</div>
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
