import { promisify } from 'util';
import fs from 'fs';
import { encrypt, decrypt } from '@/modules/encryption/crypto';

import configExample from './config-example';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const CONFIG_FILE_NAME = 'config.encrypted';
const LOCAL_CONFIG_FILE_PATH = CONFIG_FILE_NAME;

export async function getConfig() {
  let parsedConfig;
  let configFromFile = await getConfigFromFile(LOCAL_CONFIG_FILE_PATH);

  if (configFromFile) {
    configFromFile = await decrypt(configFromFile);
    parsedConfig = JSON.parse(configFromFile);
  } else {
    // Fallback to configExample if there is no config file defined at all
    parsedConfig = configExample;
  }
  return parsedConfig;
}

async function getConfigFromFile(configFilePath) {
  if (fs.existsSync(configFilePath)) {
    return readFile(configFilePath, {
      encoding: 'utf8'
    });
  }
  return null;
}

export async function updateConfig(configToUpdate) {
  const stringifiedConfig = JSON.stringify(configToUpdate, null, 2);
  const encryptedConfigStr = await encrypt(stringifiedConfig);
  await writeFile(LOCAL_CONFIG_FILE_PATH, encryptedConfigStr);
}
