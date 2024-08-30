/* eslint-disable no-console */
import { getYnabAccountData } from '#preload';
import { makeAutoObservable, runInAction } from 'mobx';
import { createContext, useContext } from 'react';
import { type YnabAccountDataType, type YnabConfig } from '../types';

// TODO: rename to YnabStore
export default class Store {

  ynabAccountData?: YnabAccountDataType;

  fetchingYnabAccountData: boolean;

  constructor() {
    this.fetchingYnabAccountData = false;
    makeAutoObservable(this);
  }

  async fetchYnabAccountData(ynabOptions: YnabConfig['options']) {
    console.log('Fetching ynab account data');
    this.fetchingYnabAccountData = true;
    const ynabAccountData = await getYnabAccountData(ynabOptions);
    runInAction(() => {
      this.ynabAccountData = ynabAccountData;
      this.fetchingYnabAccountData = false;
      console.log('Ynab account data ', this.ynabAccountData);
    });
  }

}

const StoreContext = createContext<Store>(new Store());
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
