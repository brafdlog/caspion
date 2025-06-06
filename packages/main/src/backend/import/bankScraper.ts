import { type AccountToScrapeConfig } from '@/backend/commonTypes';
import { createScraper, type ScraperOptions } from 'israeli-bank-scrapers-core';

interface ScrapeParameters {
  companyId: AccountToScrapeConfig['key'];
  credentials: AccountToScrapeConfig['loginFields'];
  startDate: Date;
  showBrowser?: boolean;
  timeout: number;
}

type EmitProgressEventFunction = (eventCompanyId: string, message: string) => Promise<void>;

export async function scrape(
  { companyId, credentials, startDate, timeout, showBrowser = false }: ScrapeParameters,
  emitProgressEvent: EmitProgressEventFunction,
  chromePath: string,
) {
  const options: ScraperOptions = {
    companyId, // mandatory; one of 'hapoalim', 'discount', 'otsarHahayal', 'leumiCard', 'isracard', 'amex'
    startDate, // the date to fetch transactions from (can't be before the minimum allowed time difference for the scraper)
    combineInstallments: false, // if set to true, all installment transactions will be combine into the first one
    showBrowser, // shows the browser while scraping, good for debugging (default false)
    verbose: false, // include more debug info about in the output
    executablePath: chromePath,
    defaultTimeout: timeout,
  };
  const scraper = createScraper(options);
  scraper.onProgress((eventCompanyId: string, payload: { type: string }) => {
    emitProgressEvent(companyId, payload.type);
  });
  const scrapeResult = await scraper.scrape(credentials);
  return scrapeResult;
}
