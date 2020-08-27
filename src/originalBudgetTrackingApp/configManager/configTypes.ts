import { CompanyTypes } from '@brafdlog/israeli-bank-scrapers-core';

export interface Config {
    outputVendors: {
        googleSheets?: GoogleSheetsConfig;
        ynab?: YnabConfig;
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

export interface OutputVendorConfig {
    active: boolean;
}

export interface GoogleSheetsConfig extends OutputVendorConfig {
    options: {
        credentialsFilePath: string;
        sheetName: string;
        spreadsheetId: string;
    }
}

export interface YnabConfig extends OutputVendorConfig {
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
