import { existsSync, promises as fs } from 'fs';
import { decrypt, encrypt } from '@/backend/configManager/encryption/crypto';
import { Config } from '@/backend/commonTypes';
import configExample from './defaultConfig';

export async function getConfig(configPath: string): Promise<Config> {
  const configFromFile = await getConfigFromFile(configPath);

  if (configFromFile) {
    const decripted = await decrypt(configFromFile) as string;
    return JSON.parse(decripted);
  }

  // Fallback to configExample if there is no config file defined at all
  return configExample;
}

export async function updateConfig(configPath: string, configToUpdate: Config): Promise<void> {
  const stringifiedConfig = JSON.stringify(configToUpdate, null, 2);
  const encryptedConfigStr = await encrypt(stringifiedConfig);
  await fs.writeFile(configPath, encryptedConfigStr);
}

async function getConfigFromFile(configFilePath: string) {
  if (existsSync(configFilePath)) {
    return fs.readFile(configFilePath, {
      encoding: 'utf8'
    });
  }
  return null;
}
