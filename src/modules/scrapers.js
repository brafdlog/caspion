/* eslint-disable max-len */
import { createScraper, SCRAPERS } from 'israeli-bank-scrapers-core';
import getChrome from './downloadChromium';

export const scrapers = Object.keys(SCRAPERS)
  .filter((key) => key !== 'leumiCard')
  .map((key) => ({
    key,
    ...SCRAPERS[key],
  }));

export async function scrape(
  installPath,
  scraperName,
  loginFields,
  showBrowser,
  onProgress,
  logger,
) {
  onProgress({ percent: 0.01, message: 'Step 1: check if Chrome exists' });
  const chromePath = await getChrome(installPath, onProgress);
  const options = {
    companyId: scraperName, // mandatory; one of 'hapoalim', 'leumi', 'discount', 'otsarHahayal', 'visaCal', 'leumiCard', 'isracard', 'amex'
    // startDate: Date, // the date to fetch transactions from (can't be before the minimum allowed time difference for the scraper)
    // combineInstallments: boolean, // if set to true, all installment transactions will be combine into the first one
    showBrowser, // shows the browser while scraping, good for debugging (default false)
    verbose: showBrowser, // include more debug info about in the output
    // browser : Browser, // optional option from init puppeteer browser instance outside the libary scope. you can get browser diretly from puppeteer via `puppeteer.launch()` command.
    executablePath: chromePath, // string // optional. provide a patch to local chromium to be used by puppeteer. Relevant when using `israeli-bank-scrapers-core` library
  };
  if (logger) logger.info(JSON.stringify(options));
  onProgress({ percent: 0.5, message: `Step 2: Starting to scrape ${scraperName}` });
  const scraper = createScraper(options);
  return scraper.scrape(loginFields);
}
