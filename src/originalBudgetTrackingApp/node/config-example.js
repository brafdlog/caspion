// This file is used as the initial config until the user saves the config for the first time to the file system
export default {
  scraping: {
    numDaysBack: 40,
    showBrowser: false,
    accountsToScrape: [
      // Add the accounts you want to scrape here
      // Possible company ids are 'hapoalim', 'leumi', 'discount', 'otsarHahayal', 'visaCal', 'leumiCard', 'isracard', 'amex'
      {
        companyId: 'leumi',
        credentials: {
          username: process.env.LEUMI_USERNAME,
          password: process.env.LEUMI_PASSWORD
        }
      },
      {
        companyId: 'leumiCard',
        credentials: {
          username: process.env.LEUMI_CARD_USERNAME,
          password: process.env.LEUMI_CARD_PASSWORD
        }
      }
    ]
  },
  outputVendors: {
    ynab: {
      active: true,
      accessToken: 'YNAB_ACCESS_TOKEN_GOES_HERE',
      budgetId: '########-####-####-####-############',
      accountNumbersToYnabAccountIds: {
        1234: '########-####-####-####-############',
        5678: '########-####-####-####-############',
        4837: '########-####-####-####-############'
      },
      options: {}
    },
    googleSheets: {
      active: false,
      options: {
        spreadsheetId: '############################################',
        sheetName: '###############',
        credentialsFilePath: '/###########/google_api_credentials.json'
      }
    }
  },
  monitoring: {
    email: {
      toEmailAddress: 'joe@someemail.com',
      sendgridApiKey: process.env.SENDGRID_API_KEY,
      sendReport: false
    }
  }
};
