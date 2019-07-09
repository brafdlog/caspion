import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab/index';
import CircularProgress from '@material-ui/core/CircularProgress/index';
import { ipcRenderer } from 'electron';
import styles from './HomePage.css';
import { jsonStringifyPretty } from '../../webUtils';
import events from '../../../constants/events';

const SCRAPING_STATUS = {
  initial: 'initial',
  inProgress: 'inProgress',
  done: 'done',
  error: 'error'
};

const HomePage = () => {
  const [status, setStatus] = useState(SCRAPING_STATUS.initial);
  const [scraperPayload, setScraperPayload] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    ipcRenderer.on(events.scraping.done, (event, arg) => {
      setStatus(SCRAPING_STATUS.done);
      setScraperPayload(arg);
    });
    ipcRenderer.on(events.scraping.error, (event, arg) => {
      setStatus(SCRAPING_STATUS.error);
      setError(arg);
    });
  }, []);

  function runScraper() {
    setStatus(SCRAPING_STATUS.inProgress);
    ipcRenderer.send(events.scraping.start);
  }

  const isInProgress = status === SCRAPING_STATUS.inProgress;
  const isDone = status === SCRAPING_STATUS.done;
  const isError = status === SCRAPING_STATUS.error;
  return (
    <div className={styles.container} data-tid="container">
      <h2>איפה הכסף?</h2>
      <Fab disabled={isInProgress} variant="extended" onClick={runScraper} size="large" color="primary">
        {isInProgress ? <CircularProgress /> : null}
        תראה לי ת׳כסף <span role="img">💸</span>
      </Fab>
      {isError ? (
        <>
          <div>failed! 😭😭😭😭</div>
          <div>{jsonStringifyPretty(error)}</div>
        </>
      ) : null}
      {isDone ? (
        <>
          <div>yay!</div>
          <div>{jsonStringifyPretty(scraperPayload)}</div>
        </>
      ) : null}
    </div>
  );
};

export default HomePage;
