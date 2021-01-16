import { Config } from './configManager';

const DEFAULT_CONFIG: Config = {
  scraping: {
    numDaysBack: 40,
    showBrowser: false,
    accountsToScrape: [],
  },
  outputVendors: {
    csv: {
      active: true,
      options: {
        filePath: 'transaction.csv'
      }
    },
    json: {
      active: false,
      options: {
        filePath: 'transaction.json'
      }
    },
    ynab: {
      active: false,
      options: {
        accessToken: 'YNAB_ACCESS_TOKEN_GOES_HERE',
        budgetId: '########-####-####-####-############',
        accountNumbersToYnabAccountIds: {
          1234: '########-####-####-####-############',
          5678: '########-####-####-####-############',
          4837: '########-####-####-####-############'
        }
      }
    },
    googleSheets: {
      active: false,
      options: {
        credentials: {},
        spreadsheetId: ''
      }
    }
  }
};

export default DEFAULT_CONFIG;
