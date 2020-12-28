# Automated budget tracking

![Build/Release](https://github.com/brafdlog/budget-tracking/workflows/Build/Release/badge.svg?branch=master&event=push)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/brafdlog/budget-tracking.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/brafdlog/budget-tracking/context:javascript)

Many people track their expenses with spreadsheets or with budgeting apps (like [YNAB](https://ynab.com/referral/?ref=Z5wPbP0cYTWjdTQj&utm_source=customer_referral)).

The most annoying part of this process is transferring the data from the banks or credit cards to the budgeting tool you use. It usually requires you to go to the website of each one of your banks and credit cards, and manually copy the data to your budgeting tool.

This project aims to automate this process by fetching the data automatically from your Israeli financial institutions and sending it to the budgeting tool of your choice.

In addition, it can automatically set an expense category for transactions according to predefined patterns.

Internally it uses the [Israeli bank scrapers](https://github.com/eshaham/israeli-bank-scrapers) npm package.


>
> We have decided to merge the [israeli-bank-scrapers-desktop](https://github.com/baruchiro/israeli-bank-scrapers-desktop) project into this repository, and work together on the same project. 
>
> The merge is in progress in the `unifyRepos` branch in this [PR](https://github.com/brafdlog/budget-tracking/pull/50)
>  

### What is currently supported:

- One click to fetch transactions from multiple Israeli banks and credit cards
- A configuration for automatically classifying transactions to categories according to predefined patterns
- Creating transactions in YNAB automatically using YNAB's api
- Initial implementation of creating transactions in a google spreadsheet of your choice
- A very basic UI for configuration
- Most of the configuration is currently in an encrypted JSON file and options that are not available in the ui can be changed by updating the JSON manually.

## Initial setup

- Run `yarn` to install the dependencies
- Copy `categoryCalculationScript-example.js` to `categoryCalculationScript.js`
  - This file contains the patterns for classifying transactions to categories automatically.
  - Edit this file to add any mapping from function description to category that fits your needs.
  - If using YNAB, the categories you return must match category names in YNAB
- Run `yarn start` to start the app
- Go to `הגדרות` and add the financial institutions you want and remove the default ones
- Setup YNAB and/or Google spreadsheet integrations (see instructions below). Make sure to disable integration that you aren't using (set active field to false)
- Run by clicking on the `תראה לי ת׳כסף` button in the app

## YNAB integration setup (optional)

YNAB is a budgeting software. If you want to manage your budget there and have your expenses updated automatically to YNAB follow these steps:

- Create an account in [YNAB](https://ynab.com/referral/?ref=Z5wPbP0cYTWjdTQj&utm_source=customer_referral)
- Create in YNAB unlinked accounts for each financial account you want to track (bank accounts and credit cards)
- Get the **YNAB access token**
  - In YNAB go to `Account settings -> Developer settings`
  - Click on `New Token` and `generate`
  - On the top of the screen you will see the full token (the token with XXXX in it is not the full one).
  - In the budget app open `הגדרות מתקדמות` and edit the JSON set `outputVendors.ynab.accessToken` to the access token.
  - Click on save.
- Collect ynab account details by running `yarn print-ynab-account-data`. This will log among others the following:
  - **YNAB budget id**
    - Set this in the JSON under `outputVendors.ynab.budgetId`
  - **YNAB account ids**
    - Each account you created in YNAB has an id and we need those ids in order to match each transaction from a financial institution to the correct account in YNAB
    - We will need these ids to setup the matching between financial account number to the corresponding ynab account id.
  - **Financial institutions account numbers**
    - These are the account numbers in the banks/credit card companies you added
- For each financial account number from a previous step, find the corresponding ynab account and add to `ynab.accountNumbersToYnabAccountIds` an entry like: `accountNumber: ynabAccountId`
- **Click on Save to save the configuration**

## Google spreadsheet integration setup (optional)

- Setup api access in the google api console as follows:
  - Go to the [google api console](https://console.developers.google.com/)
  - Create a project
  - Click enable apis and services
    - Find google sheets and enable it
  - Click create credentials
  - Create service account
  - Give it a name and copy the **service account ID** (which looks like an email address), we will need it later.
  - Continue twice until you reach a page with a button that says "Create key"
  - Click on the "Create key" button
  - Choose JSON and create it
  - Save this json somewhere in the file system
- Create spreadsheet
  - You can start from [this template](https://docs.google.com/spreadsheets/d/1X3vhn9YvJPMi_wrldV0VChNXB2z7paSuVoIQ2J8j6vo/template/preview) that has basic budget tracking built in. Or create your own.
  - After creating the spreadsheet, the url of the spreadsheet will look something like: `https://docs.google.com/spreadsheets/d/########################/edit#gid=0`
  - The ############ part is the **spreadsheetId**
  - Give a name to the sheet that will contain the transactions (it can stay with the default name e.g Sheet1), this is the **sheetName**
  - From the spreadsheet screen click share, and share it with the service account ID that you got when creating the service account (see above).
- Update the config JSON as follows:
  - Set `outputVendors.googleSheets.active` to `true`
  - Set `outputVendors.googleSheets.options.sheetName` to the sheetName
  - Set `outputVendors.googleSheets.options.spreadsheetId` to the spreadsheetId
  - Set `outputVendors.googleSheets.options.credentialsFilePath` to the path in the file system where you saved the google credentials json file

#### Disclaimer

Providing your financial account credentials to software is not risk free. We will do our best to protect your credentials, but we take no responsibility for any possible damages. If you want to use this we suggest you ask your financial institution for credentials for a user that has only read access to the relevant account and use those credentials to reduce the potential risk.
![](https://api.segment.io/v1/pixel/page?data=ewogICJ3cml0ZUtleSI6ICJtOVh2MHpHZTFvVWphaVU4cjJUZjJBdU44SThmQlJyYyIsCiAgIm5hbWUiOiAiUkVBRE1FIiwKICAiYW5vbnltb3VzSWQiOiAiYWFhYSIKfQ==)
