# budget-tracking

This project automatically fetches financial transactions from Israeli banks and credit cards, classifies them according to a function you define and sends the results to YNAB or to a google spreadsheet of your choice.

Internally it uses the [Israeli bank scrapers](https://github.com/eshaham/israeli-bank-scrapers) npm package.

This is a work in progress.

TODO:

- [x] Extract configuration logic to a config file.
- [ ] Update README with full instructions on setting up project.
- [ ] Take classification logic from a json instead of code
- [ ] Create a UI for setting up the configurations so users who are not programmers could use it
  - [ ] Create an electron app
  - [ ] Screen for adding financial institutions to track
  - [ ] Screen for setting up google sheets integration
  - [ ] Screen for connecting to ynab
  - [ ] Screen for defining logic of transaction category classification
  - [ ] Allow classifying transactions that were not automatically detected and save these so future transactions like those will be automatically classified
  - [ ] Run periodically
- [ ] Add tests
- [ ] Create a google spreadsheets template which is already set up with financial tracking logic and when a user connects to google sheets automatically clone that spreadsheet as a starting point for the user. See [paamonim's sheet](https://docs.google.com/spreadsheets/d/11yMAvBwtvlPzA855q8BPRMrjrdAUBsd4HKA7km1-LG0/edit?usp=sharing) for reference.
- [ ] Allow passing the user's own encryption key for encryption the financial institution credentials

#### disclaimer

Providing your financial account credentials to software is not risk free. We will do our best to protect your credentials but take no responsibility for any possible damages. If you want to use this we suggest you ask your bank for credentials for a user that has only read access to the bank account and use those credentials.
