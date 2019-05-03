# budget-tracking
This project automtically fetches financial transactions from Israeli banks and credit cards, classifies them according to a function you define and sends the results to YNAB or to a google spreadsheet of your choice.

Internally it uses the [Israeli bank scrapers](https://github.com/eshaham/israeli-bank-scrapers) npm package.

This is a work in progress. 

TODO:

- [x] Extract configuration logic to a config file.
- [ ] Create a UI for setting up the configurations so users who are not programmers could use it
   - [ ] Create an electron app
   - [ ] Screen for adding financail institutions to track
   - [ ] Screen for setting up google sheets integration
   - [ ] Screen for connecting to ynab
   - [ ] Screen for defining logic of transaction category calssification
   - [ ] Allow classifying transactions that were not automatically detected and save these so future transactions like those will be automcatically classified
   - [ ] Run periodically
- [ ] Update README with full instractions on setting up project.
- [ ] Add tests
- [ ] Take classification logic from a json instead of code
- [ ] Allow passing the user's own encryption key for encryption the financial institution credentials
