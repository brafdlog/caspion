const { app } = require('electron');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const configExample = require('./config-example');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const appDataFolderPath = app.getPath('userData');
const CONFIG_FILE_NAME = 'config.json';
const CONFIG_FILE_PATH = path.join(appDataFolderPath, CONFIG_FILE_NAME);

async function getConfig() {
  try {
    const configFromFile = await readFile(CONFIG_FILE_PATH, {
      encoding: 'utf8'
    });
    if (configFromFile) {
      return JSON.parse(configFromFile);
    }
  } catch (e) {
    console.debug('Failed reading config file', e);
  }
  return {
    ...configExample
  };
}

async function updateConfig(configToUpdate) {
  const stringifiedConfig = JSON.stringify(configToUpdate, null, 2);
  await writeFile(CONFIG_FILE_PATH, stringifiedConfig);
}

module.exports = {
  getConfig,
  updateConfig
};
