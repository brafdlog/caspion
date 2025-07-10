import { type AccountToScrapeConfig } from '@/backend/commonTypes';
import { createScraper, type ScraperOptions } from 'israeli-bank-scrapers-core';
import logger from '/@/logging/logger';

interface ScrapeParameters {
  companyId: AccountToScrapeConfig['key'];
  credentials: AccountToScrapeConfig['loginFields'];
  startDate: Date;
  showBrowser?: boolean;
  timeout: number;
}

type EmitProgressEventFunction = (eventCompanyId: string, message: string) => Promise<void>;

/**
 * Creates Chromium proxy arguments based on system proxy configuration
 * Checks environment variables for proxy configuration
 */
function getProxyArgs(): string[] {
  const proxyUrl =
    process.env.HTTPS_PROXY ??
    process.env.https_proxy ??
    process.env.HTTP_PROXY ??
    process.env.http_proxy ??
    process.env.ALL_PROXY ??
    process.env.all_proxy;

  if (proxyUrl) {
    logger.log(`Using proxy for scraping: ${proxyUrl}`);
    return [`--proxy-server=${proxyUrl}`];
  }

  // Check if NO_PROXY or no_proxy is set to disable proxy
  const noProxy = process.env.NO_PROXY ?? process.env.no_proxy;
  if (noProxy) {
    logger.log('Proxy disabled for scraping by NO_PROXY environment variable');
  }

  return [];
}

export async function scrape(
  { companyId, credentials, startDate, timeout, showBrowser = false }: ScrapeParameters,
  emitProgressEvent: EmitProgressEventFunction,
  chromePath: string,
) {
  const proxyArgs = getProxyArgs();

  const options: ScraperOptions = {
    companyId, // mandatory; one of 'hapoalim', 'discount', 'otsarHahayal', 'leumiCard', 'isracard', 'amex'
    startDate, // the date to fetch transactions from (can't be before the minimum allowed time difference for the scraper)
    combineInstallments: false, // if set to true, all installment transactions will be combine into the first one
    showBrowser, // shows the browser while scraping, good for debugging (default false)
    verbose: false, // include more debug info about in the output
    executablePath: chromePath,
    defaultTimeout: timeout,
    args: proxyArgs, // Add proxy configuration to browser args
  };
  const scraper = createScraper(options);
  scraper.onProgress((eventCompanyId: string, payload: { type: string }) => {
    emitProgressEvent(companyId, payload.type);
  });
  const scrapeResult = await scraper.scrape(credentials);
  return scrapeResult;
}
