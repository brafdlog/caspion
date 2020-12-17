import { scrapeAndUpdateOutputVendors } from '../index';

export async function scrape(
  // installPath,
  // scraperName,
  // credentials,
  // showBrowser,
  // onProgress,
  // logger,
) {
  const result = await scrapeAndUpdateOutputVendors();
  return result;
}
