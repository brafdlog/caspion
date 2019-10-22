import { createScraper } from 'israeli-bank-scrapers-core'

export async function scrape (scraperName, loginFields) {
  const options = {
    companyId: scraperName // mandatory; one of 'hapoalim', 'leumi', 'discount', 'otsarHahayal', 'visaCal', 'leumiCard', 'isracard', 'amex'
    // startDate: Date, // the date to fetch transactions from (can't be before the minimum allowed time difference for the scraper)
    // combineInstallments: boolean, // if set to true, all installment transactions will be combine into the first one
    // showBrowser: boolean, // shows the browser while scraping, good for debugging (default false)
    // verbose: boolean, // include more debug info about in the output
    // browser : Browser, // optional option from init puppeteer browser instance outside the libary scope. you can get browser diretly from puppeteer via `puppeteer.launch()` command.
    // executablePath: string // optional. provide a patch to local chromium to be used by puppeteer. Relevant when using `israeli-bank-scrapers-core` library
  }
  const scraper = createScraper(options)
  return scraper.scrape(loginFields)
}
