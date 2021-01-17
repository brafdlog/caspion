import { decrypt, encrypt } from '@/backend/configManager/encryption/crypto';
import { existsSync, promises as fs } from 'fs';
import { CompanyTypes } from 'israeli-bank-scrapers-core';
import { Credentials } from '../export/outputVendors/googleSheets/googleAuth';
import configExample from './defaultConfig';

export interface Config {
  outputVendors: {
    [OutputVendorName.GOOGLE_SHEETS]?: GoogleSheetsConfig;
    [OutputVendorName.YNAB]?: YnabConfig;
    [OutputVendorName.JSON]?: JsonConfig;
    [OutputVendorName.CSV]?: CsvConfig;
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
  JSON = 'json',
  CSV = 'csv'
}

export type OutputVendorConfigs = Exclude<Config['outputVendors'][OutputVendorName], undefined>
export type OutputVendorConfig<T extends OutputVendorName> = Exclude<Config['outputVendors'][T], undefined>

interface OutputVendorConfigBase {
  active: boolean;
}

export interface CsvConfig extends OutputVendorConfigBase {
  options: {
    filePath: string;
  }
}

export interface JsonConfig extends OutputVendorConfigBase {
  options: {
    filePath: string;
  }
}

export interface GoogleSheetsConfig extends OutputVendorConfigBase {
  options: {
    credentials: Credentials;
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
