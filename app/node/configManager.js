const { app } = require('electron');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const encryption = require('./encryption');

const configExample = require('./config-example');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const appDataFolderPath = app ? app.getPath('userData') : '';
const CONFIG_FILE_NAME = 'config.json';
const APP_DATA_CONFIG_FILE_PATH = path.join(appDataFolderPath, CONFIG_FILE_NAME);
const LOCAL_CONFIG_FILE_PATH = CONFIG_FILE_NAME;

async function getConfig() {
  let configFromFile = await getConfigFromFile(LOCAL_CONFIG_FILE_PATH);
  if (!configFromFile) {
    // Fallback to APP_DATA config if local configuration doesn't exist.
    configFromFile = await getConfigFromFile(APP_DATA_CONFIG_FILE_PATH);
  }
  if (!configFromFile) {
    // Fallback to configExample if there is no config file defined at all
    configFromFile = configExample;
  }
  const parsedConfig = JSON.parse(configFromFile);
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

async function updateConfig(configToUpdate) {
  const stringifiedConfig = JSON.stringify(configToUpdate, null, 2);
  const encryptedConfigStr = encryptConfig(stringifiedConfig);
  await writeFile(LOCAL_CONFIG_FILE_PATH, encryptedConfigStr);
}

function encryptConfig(stringifiedConfig) {
  const encryptedConfig = encryption.encrypt(stringifiedConfig);
  return JSON.stringify(encryptedConfig);
}

function decryptConfigIfNeeded(configFromFile) {
  const isEncrypted = configFromFile.encryptedData;
  if (isEncrypted) {
    const decryptedConfig = encryption.decrypt(configFromFile);
    return JSON.parse(decryptedConfig);
  }
  return configFromFile;
}

module.exports = {
  getConfig,
  updateConfig
};
