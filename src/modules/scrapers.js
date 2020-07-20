import { scrapeAndUpdateOutputVendors } from '../originalBudgetTrackingApp';

export async function scrape(
  // installPath,
  // scraperName,
  // loginFields,
  // showBrowser,
  // onProgress,
  // logger,
) {
  const result = await scrapeAndUpdateOutputVendors();
  return result;
}
