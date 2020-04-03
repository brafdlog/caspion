# Automated budget tracking

Many people track their expenses with spreadsheets or with budgeting apps (like [YNAB](https://ynab.com/referral/?ref=Z5wPbP0cYTWjdTQj&utm_source=customer_referral)).

The most annoying part of this process is transferring the data from the banks or credit cards to the budgeting tool you use. It usually requires you to go to the website of each one of your banks and credit cards, and manually copy the data to your budgeting tool.

This project aims to automate this process by fetching the data automatically from your Israeli financial institutions and sending it to the budgeting tool of your choice.

In addition it can automatically set an expense category for transactions according to predefined patterns.

Internally it uses the [Israeli bank scrapers](https://github.com/eshaham/israeli-bank-scrapers) npm package.

**This is a work in progress**

### What is currently supported:

- One click to fetch transactions from multiple Israeli banks and credit cards
- A configuration for automatically classifying transactions to categories according to predefined patterns
- Creating transactions in YNAB automatically using YNAB's api
- Initial implementation of creating transactions in a google spreadsheet of your choice (currently a very partial integration)
- A very basic UI for configuration
- Most of the configuration is currently in an encrypted JSON file and options that are not available in the ui can be changed by updating the JSON manually.

### Planned features:

- [x] Extract configuration logic to a config file.
- [x] Encrypt the configuration file
- [x] Update README with full instructions on setting up the project.
- [ ] Create a script to make initial YNAB setup easier
  - [ ] Fetch budget id from ynab
  - [ ] Account ids from ynab and financial institutions
  - [ ] Prints categories from YNAB
- [ ] Take classification logic from a json instead of code
- [ ] Google sheets integration
  - [ ] Add ui for authenticating with google instead of oauth link in the console
  - [ ] Create a google spreadsheets template which is already set up with financial tracking logic and when a user connects to google sheets automatically clone that spreadsheet as a starting point for the user. See [paamonim's sheet](https://docs.google.com/spreadsheets/d/11yMAvBwtvlPzA855q8BPRMrjrdAUBsd4HKA7km1-LG0/edit?usp=sharing) for reference.
- [ ] Create a UI for setting up the configurations so users who are not programmers could use it
  - [x] Create an electron app
  - [x] Screen for adding financial institutions to track
  - [ ] Screen for setting up google sheets integration
  - [ ] Screen for connecting to YNAB
  - [ ] Screen for defining logic of transaction category classification
- [ ] Allow classifying transactions that were not automatically detected and save these so future transactions like those will be automatically classified
- [ ] Run periodically
- [ ] Add tests
- [ ] Allow passing the user's own encryption key for encryption the financial institution credentials

## Initial setup

- Run `yarn` to install the dependencies
- Copy `categoryCalculationScript-example.js` to `categoryCalculationScript.js`
  - This file contains the patterns for classifying transactions to categories automatically.
  - Edit this file to add any mapping from function description to category that fits your needs.
  - If using YNAB, the categories you return must match category names in YNAB
- Run `yarn start` to start the app
- Go to `הגדרות` and add the financial institutions you want and remove the default ones
- Setup YNAB and/or Google spreadsheet integrations (see instructions below)
- Run by clicking on the `תראה לי ת׳כסף` button in the app

## YNAB integration setup (optional)

YNAB is a budgeting software. If you want to manage your budget there and have your expenses updated automatically to YNAB follow these steps:

- Create an account in [YNAB](https://ynab.com/referral/?ref=Z5wPbP0cYTWjdTQj&utm_source=customer_referral)
- Create in YNAB unlinked accounts for each financial account you want to track (bank accounts and credit cards)
- Now collect the following details from YNAB
  - **YNAB budget id**
    - In YNAB, the home page url will look like this: `https://app.youneedabudget.com/XXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXX/budget`. The XXX part is your **YNAB budget id**.
  - **YNAB access token**
    - In YNAB go to `Account settings -> Developer settings`
    - Click on `New Token` and `generate`
    - On the top of the screen you will see the full token (the token with XXXX in it is not the full one).
    - This is your YNAB access token
  - **YNAB account ids**
    - Each account you created in YNAB has an id and we need those ids in order to match each transaction from a financial institution to the correct account in YNAB
    - To get the account ids, click on each account in ynab. The url will look like: `https://app.youneedabudget.com/XXXXXXXXXX/accounts/YYYYY-YYYYY-YYYY-YYYY`
    - The `YYYYY-YYYYY-YYYY-YYYY` is the ynab account id
- In the budget app open `הגדרות מתקדמות` and edit the JSON as follows:
  - In `outputVendors.ynab.budgetId` paste the **YNAB budget id** you saved earlier
  - In `outputVendors.ynab.accessToken` paste your YNAB access token
  - **Click on Save to save the configuration**
- Run the app by clicking on the `תראה לי ת׳כסף` button.
  - Initially it will fail because it doesn't have the mapping between the account id of the financial instituion and the ynab account id. Each time it fails, the log will print an error like: `Unhandled account number 8888`
  - The number there is the account number in the financial institution.
  - For each of these, go to the JSON and under `outputVendors.ynab.accountNumbersToYnabAccountIds` add a mapping from the account number to the equivalent ynab account id
  - **Click on Save to save the configuration**

## Google spreadsheet integration setup (optional)

Note: The integration with google spreadsheets is currently very parital. You can play around with it but it is not yet ready for real use.

- Create a spreadsheet in google spreadsheet
- The url will look something like: `https://docs.google.com/spreadsheets/d/########################/edit#gid=0`
- The ############ part is the **spreadsheetId**
- Give a name to the sheet that will contain the transactions (it can stay with the default name e.g Sheet1), this is the **sheetName**
- In the google api console create a `google_api_credentials.json` allowing access to google spreadsheets, and save it in your file system.
- Update the JSON as follows:
  - Set `outputVendors.googleSheets.active` to `true`
  - Set `outputVendors.googleSheets.options.sheetName` to the sheetName
  - Set `outputVendors.googleSheets.options.spreadsheetId` to the spreadsheetId
  - Set `outputVendors.googleSheets.options.credentialsFilePath` to the path in the file system where you saved the `google_api_credentials.json` file

#### Disclaimer

Providing your financial account credentials to software is not risk free. We will do our best to protect your credentials but we take no responsibility for any possible damages. If you want to use this we suggest you ask your financial institution for credentials for a user that has only read access to the relevant account and use those credentials.
