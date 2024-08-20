import { existsSync, promises as fs } from 'fs';
import { decrypt, encrypt } from '@/backend/configManager/encryption/crypto';
import { type Config } from '@/backend/commonTypes';
import { configFilePath } from '@/app-globals';
import configExample from './defaultConfig';

export async function getConfig(configPath: string = configFilePath): Promise<Config> {
  const configFromFile = await getConfigFromFile(configPath);

  if (configFromFile) {
    const decrypted = await decrypt(configFromFile) as string;
    return JSON.parse(decrypted);
  }

  // Fallback to configExample if there is no config file defined at all
  return configExample;
}

export async function updateConfig(configPath: string, configToUpdate: Config): Promise<void> {
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
