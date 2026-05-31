import Registry from 'winreg';
import logger from '/@/logging/logger';

export interface WindowsProxySettings {
  proxyServer?: string;
  autoConfigUrl?: string;
}

const REGISTRY_PATH = '\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings';
const REGISTRY_KEYS = {
  PROXY_SERVER: 'ProxyServer',
  AUTO_CONFIG_URL: 'AutoConfigURL',
} as const;

export async function getWindowsProxySettings(): Promise<WindowsProxySettings> {
  if (process.platform !== 'win32') {
    return {};
  }

  const regKey = new Registry({
    hive: Registry.HKCU,
    key: REGISTRY_PATH,
  });

  return new Promise((resolve) => {
    regKey.values((err, items) => {
      if (err) {
        logger.log('Could not read Windows registry proxy settings:', err.message);
        resolve({});
        return;
      }

      const settings: WindowsProxySettings = {};
      for (const item of items) {
        if (item.name === REGISTRY_KEYS.PROXY_SERVER && item.value) {
          settings.proxyServer = item.value;
        } else if (item.name === REGISTRY_KEYS.AUTO_CONFIG_URL && item.value) {
          settings.autoConfigUrl = item.value;
        }
      }
      resolve(settings);
    });
  });
}
