import { promisify } from 'util';
import fs from 'fs';
import { CompanyTypes } from 'israeli-bank-scrapers-core';
import { encrypt, decrypt } from '@/modules/encryption/crypto';

import configExample from './defaultConfig';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const CONFIG_FILE_NAME = 'config.encrypted';
const LOCAL_CONFIG_FILE_PATH = CONFIG_FILE_NAME;

export interface Config {
  outputVendors: {
    [OutputVendorName.GOOGLE_SHEETS]?: GoogleSheetsConfig;
    [OutputVendorName.YNAB]?: YnabConfig;
    [OutputVendorName.JSON]?: JsonConfig;
  };
  scraping: {
    numDaysBack: number;
    showBrowser: boolean;
    accountsToScrape: AccountToScrapeConfig[];
  };
  monitoring?: {
    email: {
      sendReport: boolean;
      toEmailAddress?: string;
      sendgridApiKey?: string;
    }
  };
}

export enum OutputVendorName {
  YNAB = 'ynab',
  GOOGLE_SHEETS = 'googleSheets',
  JSON = 'json'
}

export type OutputVendorConfigs = Exclude<Config['outputVendors'][OutputVendorName], undefined>
export type OutputVendorConfig<T extends OutputVendorName> = Exclude<Config['outputVendors'][T], undefined>

interface OutputVendorConfigBase {
  active: boolean;
}

export interface JsonConfig extends OutputVendorConfigBase {
  options: {
    filePath: string;
  }
}

export interface GoogleSheetsConfig extends OutputVendorConfigBase {
  options: {
    credentialsFilePath: string;
    sheetName: string;
    spreadsheetId: string;
  }
}

export interface YnabConfig extends OutputVendorConfigBase {
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
