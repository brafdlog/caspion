const { app } = require('electron');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const encryption = require('./encryption');

const configExample = require('./config-example');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const appDataFolderPath = app.getPath('userData');
const CONFIG_FILE_NAME = 'config.json';
const CONFIG_FILE_PATH = path.join(appDataFolderPath, CONFIG_FILE_NAME);

async function getConfig() {
  if (!fs.existsSync(CONFIG_FILE_PATH)) {
    return configExample;
  }
  const configFromFile = await readFile(CONFIG_FILE_PATH, {
    encoding: 'utf8'
  });
  const parsedConfig = JSON.parse(configFromFile);
  const decryptedConfig = decryptConfigIfNeeded(parsedConfig);
  return decryptedConfig;
}

async function updateConfig(configToUpdate) {
  const stringifiedConfig = JSON.stringify(configToUpdate, null, 2);
  const encryptedConfigStr = encryptConfig(stringifiedConfig);
  await writeFile(CONFIG_FILE_PATH, encryptedConfigStr);
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
