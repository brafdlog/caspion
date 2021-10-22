import { Config } from '../types';

export const dummyConfig: Config = {
  "scraping": {
    "numDaysBack": 40,
    "showBrowser": false,
    "accountsToScrape": [
      {
        "active": true,
        "key": "discount",
        "name": "Discount Bank",
        "loginFields": {
          "id": "234234134",
          "password": "notARealPass",
          "num": "LY9999"
        },
        "id": "efsvxasgd416f94d1e45a9cfc8c0a95f"
      },
      {
        "active": true,
        "key": "visaCal",
        "name": "Visa Cal",
        "loginFields": {
          "username": "someUsername",
          "password": "somePassword"
        },
        "id": "794a9ksj532d86cb4xxxb3438d0da942"
      },
      {
        "active": true,
        "key": "max",
        "name": "Max",
        "loginFields": {
          "username": "whatAUserName",
          "password": "greatPass"
        },
        "id": "9xve2485ac202f53f85bcdb4f795dssc"
      }
    ]
  },
  "outputVendors": {
    "csv": {
      "active": true,
      "options": {
        "filePath": "transaction.csv"
      }
    },
    "json": {
      "active": false,
      "options": {
        "filePath": "transaction.json"
      }
    },
    "ynab": {
      "active": true,
      "options": {
        "accessToken": "################-######-####-###",
        "budgetId": "advasdvasd-asdvasdva-sdvasdvasdv-asdvasdvf",
        "accountNumbersToYnabAccountIds": {
          "5555": "asdvasdvsdvs",
          "1111": "xcvxcvxcvsd",
          "3333": "xvxcdv",
          "555555555": "vsdvsdvserverv"
        }
      }
    },
    "googleSheets": {
      "active": false,
      "options": {
        "credentials": "",
        "spreadsheetId": ""
      }
    }
  }
}
