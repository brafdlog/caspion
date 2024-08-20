/* eslint-disable no-console */
import { getYnabAccountData } from '#preload';
import { action, makeAutoObservable } from 'mobx';
import { createContext, useContext } from 'react';
import { type YnabAccountDataType, type YnabConfig } from '../types';

// TODO: rename to YnabStore
export default class Store {

  ynabAccountData?: YnabAccountDataType;

  fetchingYnabAccountData: boolean;

  constructor() {
    this.fetchingYnabAccountData = false;
    // TODO: remove override
    makeAutoObservable(this, {
      fetchYnabAccountData: action,
    });
  }

  async fetchYnabAccountData(ynabOptions: YnabConfig['options']) {
    console.log('Fetching ynab account data');
    this.fetchingYnabAccountData = true;
    this.ynabAccountData = await getYnabAccountData(ynabOptions);
    this.fetchingYnabAccountData = false;
    console.log('Ynab account data ', this.ynabAccountData);
  }

}

const StoreContext = createContext<Store>(new Store());
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);
