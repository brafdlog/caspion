const defaultScrpingConfig = {
  numDaysBack: 40,
  showBrowser: false,
  accountsToScrape: []
};

// After moving to TypeScript it will be easier to work with structures
export const addAccountsToScrape = (config, { companyId, credentials }) => {
  if (!config.scraping) config.scraping = defaultScrpingConfig;
  if (!config.accountsToScrape) config.accountsToScrape = [];

  config.accountsToScrape.push({ companyId, credentials });

  return config;
};
