import { promisify } from 'util';
import fs from 'fs';
import { CompanyTypes } from '@brafdlog/israeli-bank-scrapers-core';
import { encrypt, decrypt } from '@/modules/encryption/crypto';

import configExample from './defaultConfig';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const CONFIG_FILE_NAME = 'config.encrypted';
const LOCAL_CONFIG_FILE_PATH = CONFIG_FILE_NAME;

export interface Config {
  outputVendors: {
    googleSheets?: GoogleSheetsConfig;
    ynab?: YnabConfig;
    json?: JsonConfig;
  };
  scraping: {
    'numDaysBack': number;
    'showBrowser': boolean;
    'accountsToScrape': AccountToScrapeConfig[];
  };
  monitoring?: {
    email: {
      sendReport: boolean;
      toEmailAddress?: string;
      sendgridApiKey?: string;
    }
  };
}

export interface JsonConfig {
  active: boolean;
  options: {
    fileName: string;
    path:string;
  }
}
export interface GoogleSheetsConfig {
  active: boolean;
  options: {
    credentialsFilePath: string;
    sheetName: string;
    spreadsheetId: string;
  }
}

export interface YnabConfig {
  active: boolean;
  options: {
    accessToken: string;
    accountNumbersToYnabAccountIds: { [key: string]: string };
    budgetId: string;
    maxPayeeNameLength?: number;
  };
}

export interface AccountToScrapeConfig {
  id: string;
  key: CompanyTypes;
  name: string;
  loginFields: Record<string, string>;
  active?: boolean;
}

export async function getConfig(): Promise<Config> {
  let parsedConfig: Config;
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

export async function updateConfig(configToUpdate: Config): Promise<void> {
  const stringifiedConfig = JSON.stringify(configToUpdate, null, 2);
  const encryptedConfigStr = await encrypt(stringifiedConfig);
  await writeFile(LOCAL_CONFIG_FILE_PATH, encryptedConfigStr);
}

async function getConfigFromFile(configFilePath: string) {
  if (fs.existsSync(configFilePath)) {
    return readFile(configFilePath, {
      encoding: 'utf8'
    });
  }
  return null;
}
