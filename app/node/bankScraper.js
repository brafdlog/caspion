const { createScraper } = require('israeli-bank-scrapers');
// const mockTransactions = require('./mockData/mockTransactions');

async function scrape({
  companyId,
  credentials,
  startDate,
  showBrowser = false
}) {
  // if (process.env.USE_MOCK_DATA === 'true') {
  //   console.log('USING MOCK DATA');
  //   return mockTransactions[companyId];
  // }
  if (!credentials || !credentials.username || !credentials.password) {
    throw new Error(
      `Missing credentials for scraper. CompanyId: ${companyId}. Credentials: ${credentials &&
        JSON.stringify(credentials)}`
    );
  }

  const options = {
    companyId, // mandatory; one of 'hapoalim', 'discount', 'otsarHahayal', 'leumiCard', 'isracard', 'amex'
    startDate, // the date to fetch transactions from (can't be before the minimum allowed time difference for the scraper)
    combineInstallments: false, // if set to true, all installment transactions will be combine into the first one
    showBrowser, // shows the browser while scraping, good for debugging (default false)
    verbose: false // include more debug info about in the output
    // browser : Browser // optional option from init puppeteer browser instance outside the libary scope. you can get browser directly from puppeteer via `puppeteer.launch()` command.
  };
  const scraper = createScraper(options);
  const scrapeResult = await scraper.scrape(credentials);

  if (!scrapeResult.success) {
    console.error(
      `scraping failed for the following reason: ${scrapeResult.errorType}`
    );
  }
  return scrapeResult;
}

module.exports = {
  scrape
};
