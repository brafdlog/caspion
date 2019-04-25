module.exports = {
  scraping: {
    numDaysBack: 4,
    showBrowser: false,
    accountsToScrape: [
      // Add the accounts you want to scrape here
      // Possible company ids are 'hapoalim', 'leumi', 'discount', 'otsarHahayal', 'visaCal', 'leumiCard', 'isracard', 'amex'
      {
        companyId: "leumi",
        credentials: {
          username: process.env.LEUMI_USERNAME,
          password: process.env.LEUMI_PASSWORD
        }
      },
      {
        companyId: "leumiCard",
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
      accessToken: process.env.YNAB_ACCESS_TOKEN,
      budgetId: process.env.YNAB_BUDGET_ID,
      accountNumbersToYnabAccountIds: {
        "1234": "########-####-####-####-############",
        "5678": "########-####-####-####-############",
        "4837": "########-####-####-####-############"
      },
      options: {}
    },
    googleSheets: {
      active: false,
      credentialsJsonFilePath:
        process.env.GOOGLE_API_CREDENTIALS_JSON_FILE_PATH,
      options: {
        spreadsheetId: process.env.FINANCIAL_MANAGEMENT_SPREADSHEET_ID,
        sheetName: process.env.ALL_TRANSACTIONS_SHEET_NAME
      }
    }
  },
  monitoring: {
    email: {
      toEmailAddress: process.env.MY_EMAIL_ADDRESS,
      sendgridApiKey: process.env.SENDGRID_API_KEY,
      sendReport: process.env.IS_JOB
    }
  }
};
