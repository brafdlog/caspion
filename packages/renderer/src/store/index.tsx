import { getConfig } from '#preload';
import { useEffect } from 'react';
import { type Config } from '../types';
import { AppInfoStoreProvider, useInitAppInfoStore } from './AppInfoStore';
import { configStore, ConfigStoreProvider } from './ConfigStore';
import Store, { StoreProvider } from './Store';

export { useAppInfoStore } from './AppInfoStore';
export { useStore } from './Store';

const store = new Store();

export const StoresProvider = ({ children }: { children: React.ReactNode }) => {
  useInitAppInfoStore();
  // TODO: create useInitConfigStore
  useEffect(() => {
    getConfig().then(config => {
      configStore.updateConfig(config as Config);
    });
  }, []);
  return (
    <StoreProvider value={store}>
        <ConfigStoreProvider>
          <AppInfoStoreProvider>{children}</AppInfoStoreProvider>
        </ConfigStoreProvider>
    </StoreProvider>
  );
};
