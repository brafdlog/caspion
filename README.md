# Caspion - Automated expense tracking from Israeli banks and credit cards

![Build/Release](https://github.com/brafdlog/caspion/workflows/Build/Release/badge.svg?branch=master&event=push)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/brafdlog/caspion.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/brafdlog/caspion/context:javascript)
[![Discord Shield](https://discordapp.com/api/guilds/924617301209260103/widget.png?style=shield)](https://discord.gg/XWWg7xvJyS)

Many people track their expenses with spreadsheets or with budgeting apps (like [YNAB](https://ynab.com/referral/?ref=Z5wPbP0cYTWjdTQj&utm_source=customer_referral)).

The most annoying part of this process is transferring the data from the banks or credit cards to the budgeting tool you use. It usually requires you to go to the website of each one of your banks and credit cards, and manually copy the data to your budgeting tool.

This project aims to automate this process by fetching the data automatically from your Israeli financial institutions and sending it to the budgeting tool of your choice.

In addition, it can automatically set an expense category for transactions according to predefined patterns.

Internally it uses the [Israeli bank scrapers](https://github.com/eshaham/israeli-bank-scrapers) npm package.

If you want to ask questions, suggest features or report issues, join [our discord channel](https://discord.gg/XWWg7xvJyS).

## Features

- One click to fetch transactions from multiple Israeli banks and credit cards
- Exporting transactions to *Google Sheets*, *YNAB*, *Excel (CSV)* or *JSON* file
- A basic UI for configuration
- A configuration for automatically classifying transactions to categories according to predefined patterns

## Running the app

Download the latest version from [Releases](https://github.com/brafdlog/caspion/releases) page, or build it from source, with the instructions below.

### Initial setup

The first time you run the app, you will need to set up the accounts you want to fetch data from (importers).

Now you can set up the exporters - where the data will be sent to. The CSV exporter is enabled by default.
If you want to export to YNAB, see instructions at the end of the README.

### Report a problem

We are still in beta, and you may find errors.
Please use the **REPORT A PROBLEM** button in the app to report to us.

Use this button to find the **logs folder** as well.

## Running in a development environment

### Prerequisites

- [NodeJS](https://nodejs.org/en/download/).
- [`node-gyp`](https://github.com/nodejs/node-gyp#installation). In Windows you have a checkbox in the NodeJS installer to install also the `node-gyp`.  
  This module is for packages that compile native code in their installation, in our case it is required for `electron` and `keytar`. (Note that if you install visual studio, you need to add the workload of `desktop development with C++`) ![image](https://user-images.githubusercontent.com/7272927/111470123-2c849b00-8730-11eb-8fd2-f40628d34413.png)

- [Yarn](https://yarnpkg.com/getting-started/install).

#### Linux Prerequisites

Currently, this project depends on `libsecret`, so you may need to install it before running `yarn`.

Depending on your distribution, you will need to run the following command:

- Debian/Ubuntu: `sudo apt-get install libsecret-1-dev`
- Red Hat-based: `sudo yum install libsecret-devel`
- Arch Linux: `sudo pacman -S libsecret`

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

### Building for production

- Run `yarn build`

### YNAB integration setup (optional)

YNAB is a budgeting software. If you want to manage your budget there and have your expenses updated automatically to YNAB follow these steps:

- Create an account in [YNAB](https://ynab.com/referral/?ref=Z5wPbP0cYTWjdTQj&utm_source=customer_referral)
- Create in YNAB unlinked accounts for each financial account you want to track (bank accounts and credit cards)
- Get the **YNAB access token**
  - In YNAB go to `Account settings -> Developer settings`
  - Click on `New Token` and `generate`
  - On the top of the screen you will see the full token (the token with XXXX in it is not the full one).
  - Save this token in the YNAB settings in the app.
- Set your **YNAB budget id**
  - Find your YNAB budget id by going into your budget and taking it from the url: `https://app.youneedabudget.com/XXXXXX-XXXXXX-XXXXXX-XXXXX/budget`
  - Set this budget id in the YNAB settings and save.
- Fill the table containing account number to ynab account id mapping
  - For each account you want to track add another row to the table
  - To get the `ynab account id` of the account navigate to that account in ynab and get the account id from the url: `https://app.youneedabudget.com/akfkmksdcscd/accounts/XXXXXXXX-XXXX-XXXX-XXXX-XXXX`
  - The `account number` could be the credit card number, or the bank account number. To be sure, you can run the app so it exports transactions to a CSV and get the account number from there.
- **Click on Save to save the configuration**

### CSV (Excel) Note

In some cases you may get gibberish when you open the CSV file in Excel. In this case, please follow the next steps:

1. Open a new Excel document.
1. Go to `Data` -> `Import From CSV/Text`.
1. Select your CSV file.
1. For the "Encoding"/"File Origin", select `Unicode UTF-8 (65001)`.

## Release

The Release workflow, configured in `.github/workflows/release.yml`, will **draft** a new release or update the artifacts on an existing draft, according to the following conditions:

1. A change pushed to the `master` branch.
1. The `version` from the `package.json`, with the prefix `v`, is not a **published** release.
1. Upload the artifacts to the `v${package_version}` Github Release.

It means that after you published a new release, from the Github interface, you need to upgrade the version in the `package.json` file, to get a new draft.

#### Disclaimer

Providing your financial account credentials to software is not risk free. We will do our best to protect your credentials, but we take no responsibility for any possible damages. If you want to use this we suggest you ask your financial institution for credentials for a user that has only read access to the relevant account and use those credentials to reduce the potential risk.
![](https://api.segment.io/v1/pixel/page?data=ewogICJ3cml0ZUtleSI6ICJtOVh2MHpHZTFvVWphaVU4cjJUZjJBdU44SThmQlJyYyIsCiAgIm5hbWUiOiAiUkVBRE1FIiwKICAiYW5vbnltb3VzSWQiOiAiYWFhYSIKfQ==)
