import { configFilePath } from '@/app-globals';
import { type Config } from '@/backend/commonTypes';
import { decrypt, encrypt } from '@/backend/configManager/encryption/crypto';
import { existsSync, promises as fs } from 'fs';
import configExample from './defaultConfig';
import { logAppEvent } from '/@/logging/operationLogger';

export async function getConfig(configPath: string = configFilePath): Promise<Config> {
  const configFromFile = await getConfigFromFile(configPath);
  if (configFromFile) {
    const decrypted = (await decrypt(configFromFile)) as string;
    if (!decrypted) {
      logAppEvent('CONFIG_LOAD', { status: 'no_config_file', action: 'using_default' });
      return configExample;
    }
    try {
      const config = JSON.parse(decrypted);
      if (Object.keys(config).length === 0) {
        logAppEvent('CONFIG_LOAD', { status: 'empty_config', action: 'using_default' });
        return configExample;
      }
      logAppEvent('CONFIG_LOAD', {
        status: 'success',
        importersCount: config.scraping?.accountsToScrape?.length ?? 0,
        activeImporters:
          config.scraping?.accountsToScrape?.filter((a: { active?: boolean }) => a.active !== false).length ?? 0,
        exportersConfigured: Object.keys(config.outputVendors ?? {}).filter((k) => config.outputVendors[k]?.active),
      });
      return config;
    } catch (e) {
      logAppEvent('CONFIG_LOAD', {
        status: 'parse_error',
        action: 'using_default',
        errorMessage: (e as Error).message,
      });
    }
  }

  // Fallback to configExample if there is no config file, or it isn't valid
  return configExample;
}

export async function updateConfig(configPath: string, configToUpdate: Config): Promise<void> {
  logAppEvent('CONFIG_SAVE', {
    importersCount: configToUpdate.scraping?.accountsToScrape?.length ?? 0,
    exportersConfigured: Object.keys(configToUpdate.outputVendors ?? {}).filter(
      (k) => configToUpdate.outputVendors[k as keyof typeof configToUpdate.outputVendors]?.active,
    ),
  });
  const stringifiedConfig = JSON.stringify(configToUpdate, null, 2);
  const encryptedConfigStr = await encrypt(stringifiedConfig);
  await fs.writeFile(configPath, encryptedConfigStr);
}

async function getConfigFromFile(configPath: string) {
  if (existsSync(configPath)) {
    return fs.readFile(configPath, {
      encoding: 'utf8',
    });
  }
  return null;
}
