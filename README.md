# Automated expense tracking from Israeli banks and credit cards

![Build/Release](https://github.com/brafdlog/budget-tracking/workflows/Build/Release/badge.svg?branch=master&event=push)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/brafdlog/budget-tracking.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/brafdlog/budget-tracking/context:javascript)

Many people track their expenses with spreadsheets or with budgeting apps (like [YNAB](https://ynab.com/referral/?ref=Z5wPbP0cYTWjdTQj&utm_source=customer_referral)).

The most annoying part of this process is transferring the data from the banks or credit cards to the budgeting tool you use. It usually requires you to go to the website of each one of your banks and credit cards, and manually copy the data to your budgeting tool.

This project aims to automate this process by fetching the data automatically from your Israeli financial institutions and sending it to the budgeting tool of your choice.

In addition, it can automatically set an expense category for transactions according to predefined patterns.

Internally it uses the [Israeli bank scrapers](https://github.com/eshaham/israeli-bank-scrapers) npm package.

### What is currently supported:

- One click to fetch transactions from multiple Israeli banks and credit cards
- Exporting transactions to Google sheets, YNAB, CSV or JSON file
- A basic UI for configuration
- A configuration for automatically classifying transactions to categories according to predefined patterns

## Running in a development environment

### Prerequisites

- [NodeJS](https://nodejs.org/en/download/).
- [`node-gyp`](https://github.com/nodejs/node-gyp#installation). In Windows you have a checkbox in the NodeJS installer to install also the `node-gyp`.  
  This module is for packages that compiling a native code in their installation, in our case it required for `electron` and `keytar`.
- [Yarn](https://yarnpkg.com/getting-started/install).

#### Linux Prerequisites

Currently, this project depends on `libsecret`, so you may need to install it before running `yarn`.

Depending on your distribution, you will need to run the following command:

* Debian/Ubuntu: `sudo apt-get install libsecret-1-dev`
* Red Hat-based: `sudo yum install libsecret-devel`
* Arch Linux: `sudo pacman -S libsecret`

### Start from Source

- Run `yarn` to install the dependencies
- Run `yarn serve` to start the app
- Set up additional exporters (Optional)
  - If you want to set up YNAB, see instructions below
- Run by clicking on the `Run` button in the app
- Configure automatic category classification (Optional)
    - Open `categoryCalculationScript.js`. This file contains the patterns for classifying transactions to categories automatically.
    - Edit this file to add any mapping from function description to category that fits your needs.
    - If using YNAB, the categories you return must match category names in YNAB

### YNAB integration setup (optional)

YNAB is a budgeting software. If you want to manage your budget there and have your expenses updated automatically to YNAB follow these steps:

- Create an account in [YNAB](https://ynab.com/referral/?ref=Z5wPbP0cYTWjdTQj&utm_source=customer_referral)
- Create in YNAB unlinked accounts for each financial account you want to track (bank accounts and credit cards)
- Get the **YNAB access token**
    - In YNAB go to `Account settings -> Developer settings`
    - Click on `New Token` and `generate`
    - On the top of the screen you will see the full token (the token with XXXX in it is not the full one).
    - Save this token in the YNAB settings in the app and save.
- Set your **YNAB budget id**
    - Find your YNAB budget id by going into your budget and taking it from the url: `https://app.youneedabudget.com/XXXXXX-XXXXXX-XXXXXX-XXXXX/budget`
    - Set this budget id in the YNAB settings and save.
- Collect ynab account details by running `yarn print-ynab-account-data`. This will log among others the following:
    - **YNAB account ids**
        - Each account you created in YNAB has an id. We need those ids in order to match each transaction from a financial institution to the correct account in YNAB
        - We will need these ids to set up the matching between financial account number to the corresponding ynab account id.
    - **Financial institutions account numbers**
        - These are the account numbers in the banks/credit card companies you added
- For each financial account number from a previous step, find the corresponding ynab account and add it to the table in the ynab settings.
- **Click on Save to save the configuration**

### Building for production
- Run `yarn build`

#### Disclaimer

Providing your financial account credentials to software is not risk free. We will do our best to protect your credentials, but we take no responsibility for any possible damages. If you want to use this we suggest you ask your financial institution for credentials for a user that has only read access to the relevant account and use those credentials to reduce the potential risk.
![](https://api.segment.io/v1/pixel/page?data=ewogICJ3cml0ZUtleSI6ICJtOVh2MHpHZTFvVWphaVU4cjJUZjJBdU44SThmQlJyYyIsCiAgIm5hbWUiOiAiUkVBRE1FIiwKICAiYW5vbnltb3VzSWQiOiAiYWFhYSIKfQ==)
