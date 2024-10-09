/* eslint-disable no-console */
import { getYnabAccountData } from '#preload';
import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { createContext, useContext } from 'react';
import { type YnabAccountDataType, type YnabConfig } from '../types';
import logger from '../logging/logger';

// TODO: rename to YnabStore
export default class Store {
  ynabAccountData?: YnabAccountDataType;

  fetchingYnabAccountData: boolean;

  constructor() {
    this.fetchingYnabAccountData = false;
    makeAutoObservable(this);
  }

  async fetchYnabAccountData(ynabOptions: YnabConfig['options']) {
    logger.log('Fetching ynab account data');
    this.fetchingYnabAccountData = true;
    const ynabAccountData = await getYnabAccountData(ynabOptions);
    runInAction(() => {
      this.ynabAccountData = ynabAccountData;
      this.fetchingYnabAccountData = false;
      logger.log('Ynab account data ', toJS(this.ynabAccountData));
    });
  }
}

const StoreContext = createContext<Store>(new Store());
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
