import React, { useState, useEffect, useContext } from 'react';
import { Button, ProgressBar, Spinner } from 'react-bootstrap';
import {
  checkForUpdate, getAppInfo, openExternal, downloadUpdate, quitAndInstall
} from '../eventsBridge';
import { StoreContext } from '../Store';
import { styles } from './CheckForUpdates.module.css';

const UPDATE_STATES = {
  INIT: 'INIT',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  NEW_VERSION_AVAILABLE: 'NEW_VERSION_AVAILABLE',
  NO_NEW_VERSION: 'NO_NEW_VERSION',
  READY_TO_INSTALL: 'READY_TO_INSTALL',
};

type UpdateInfo = {
  version: string
}

function CheckForUpdates() {

  const [updateState, setUpdateState] = useState(UPDATE_STATES.INIT);
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo>();
  const store = useContext(StoreContext);

  const checkForUpdates = async () => {
    setUpdateState(UPDATE_STATES.LOADING);
    try {
      const info = await checkForUpdate();
      setUpdateInfo(info);
      setUpdateState(info ? UPDATE_STATES.NEW_VERSION_AVAILABLE : UPDATE_STATES.NO_NEW_VERSION);
    } catch (error) {
      console.error(error);
      setUpdateState(UPDATE_STATES.ERROR);
    }
  };

  const downloadNewVersion = async () => {
    setUpdateState(UPDATE_STATES.LOADING);
    try {
      await downloadUpdate();
      setUpdateState(UPDATE_STATES.READY_TO_INSTALL);
    } catch (error) {
      console.error(error);
      setUpdateState(UPDATE_STATES.ERROR);
    }
  };

  const openGithubRelease = () => {
    openExternal(`${store.appInfo?.repository}/releases/tag/v${updateInfo?.version}`);
  };
  const openCompare = () => {
    openExternal(`${store.appInfo?.repository}/compare/v${store.appInfo?.currentVersion}...v${updateInfo?.version}`);
  };

  return (
    <>
    {updateState === UPDATE_STATES.LOADING && (
       <Spinner animation="border" role="status"/>
    )}
    {updateState === UPDATE_STATES.INIT && (
      <Button variant="dark" size="sm" className='m-2' onClick={checkForUpdates}>
        בדיקת עדכונים
      </Button>
    )}
    {updateState === UPDATE_STATES.NO_NEW_VERSION && (
      <div>אין עדכונים זמינים</div>
    )}
     {updateState === UPDATE_STATES.NEW_VERSION_AVAILABLE && (
        <div className='m-2'>
          <Button variant="dark" size="sm" className='m-2' onClick={downloadNewVersion}>
            הורדת גירסה {updateInfo?.version}
          </Button>
          <Button variant="dark" size="sm" className='m-2' onClick={openGithubRelease}>
            לפתוח Github
          </Button>
          <Button variant="dark" size="sm" className='m-2' onClick={openCompare}>
            לפתוח השוואה
          </Button>
        </div>
     )}
    {updateState === UPDATE_STATES.READY_TO_INSTALL && (
       <Button variant="dark" size="sm" className='m-2' onClick={quitAndInstall}>
        יציאה והתקנה
       </Button>
    )}
    </>
  );
}

export default CheckForUpdates;
