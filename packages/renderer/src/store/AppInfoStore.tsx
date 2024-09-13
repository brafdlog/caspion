import { getAppInfo } from '#preload';
import { makeAutoObservable } from 'mobx';
import { createContext, useContext, useEffect } from 'react';
import { type AppInfo } from '../types';

class AppInfoStore {
  appInfo: AppInfo;

  constructor() {
    makeAutoObservable(this);
  }

  updateAppInfo(appInfo: AppInfo) {
    this.appInfo = appInfo;
  }
}

const appInfoStore = new AppInfoStore();
const AppInfoStoreContext = createContext(appInfoStore);
export const AppInfoStoreProvider = ({ children }: { children: React.ReactNode }) => (
  <AppInfoStoreContext.Provider value={appInfoStore}>{children}</AppInfoStoreContext.Provider>
);
export const useInitAppInfoStore = () => {
  useEffect(() => {
    getAppInfo().then(appInfo => {
      appInfoStore.updateAppInfo(appInfo);
    });
  });
};
export const useAppInfoStore = () => useContext(AppInfoStoreContext);
