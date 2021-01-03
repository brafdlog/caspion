import { getPuppeteerConfig } from 'israeli-bank-scrapers-core';
import puppeteer from 'puppeteer-core';

type PuppeteerProgressCallback = (downloadBytes: number, totalBytes: number) => void
type PercentCallback = (percent: number) => void

const getIntegerPercent = (callback: PercentCallback): PuppeteerProgressCallback => {
  let prevPercent = -1;

  return (downloadBytes: number, totalBytes: number) => {
    const p = Math.floor((downloadBytes / totalBytes) * 100);
    if (p > prevPercent) {
      prevPercent = p;
      callback(p);
    }
  };
};

const revision = getPuppeteerConfig().chromiumRevision;

let downloadProm: ReturnType<typeof downloadChromium> | null = null;

export default async function downloadChromium(installPath?: string, onProgress?: PercentCallback): Promise<string> {
  if (downloadProm) return downloadProm;

  const progressCallback = onProgress && getIntegerPercent(onProgress);

  const browserFetcher = puppeteer.createBrowserFetcher({ path: installPath });
  downloadProm = browserFetcher.download(revision, progressCallback)
    .then(({ executablePath }) => executablePath);

  downloadProm.then(() => downloadProm = null);

  return downloadProm;
}
