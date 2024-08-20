import { type Config } from '../commonTypes';

const DEFAULT_CONFIG: Config = {
  scraping: {
    numDaysBack: 40,
    showBrowser: false,
    accountsToScrape: [],
    timeout: 60000,
  },
  outputVendors: {
    csv: {
      active: true,
      options: {
        filePath: 'transaction.csv',
      },
    },
    json: {
      active: false,
      options: {
        filePath: 'transaction.json',
      },
    },
    ynab: {
      active: false,
      options: {
        accessToken: 'YNAB_ACCESS_TOKEN_GOES_HERE',
        budgetId: '',
        accountNumbersToYnabAccountIds: {
        },
      },
    },
    googleSheets: {
      active: false,
      options: {
        credentials: {},
        spreadsheetId: '',
      },
    },
  },
};

export default DEFAULT_CONFIG;
