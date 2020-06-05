import { app } from 'electron';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import { encrypt, decrypt } from './encryption';

import configExample from './config-example';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const appDataFolderPath = app ? app.getPath('userData') : '';
const CONFIG_FILE_NAME = 'config.json';
const APP_DATA_CONFIG_FILE_PATH = path.join(appDataFolderPath, CONFIG_FILE_NAME);
const LOCAL_CONFIG_FILE_PATH = CONFIG_FILE_NAME;

export async function getConfig() {
  let parsedConfig;
  let configFromFile = await getConfigFromFile(LOCAL_CONFIG_FILE_PATH);
  if (!configFromFile) {
    // Fallback to APP_DATA config if local configuration doesn't exist.
    configFromFile = await getConfigFromFile(APP_DATA_CONFIG_FILE_PATH);
  }
  if (configFromFile) {
    parsedConfig = JSON.parse(configFromFile);
  } else {
    // Fallback to configExample if there is no config file defined at all
    parsedConfig = configExample;
  }
  const decryptedConfig = decryptConfigIfNeeded(parsedConfig);
  return decryptedConfig;
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
  const encryptedConfigStr = encryptConfig(stringifiedConfig);
  await writeFile(LOCAL_CONFIG_FILE_PATH, encryptedConfigStr);
}

function encryptConfig(stringifiedConfig) {
  const encryptedConfig = encrypt(stringifiedConfig);
  return JSON.stringify(encryptedConfig);
}

function decryptConfigIfNeeded(configFromFile) {
  const isEncrypted = configFromFile.encryptedData;
  if (isEncrypted) {
    const decryptedConfig = decrypt(configFromFile);
    return JSON.parse(decryptedConfig);
  }
  return configFromFile;
}
