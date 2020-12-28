import download, { OnProgress } from 'download-chromium';
import { getPuppeteerConfig } from 'israeli-bank-scrapers-core';

const getIntegerPercent = (callback: OnProgress): OnProgress => {
  let prevPercent = -1;

  return ({ percent, ...rest }) => {
    const p = Math.floor(percent * 10);
    if (p > prevPercent) {
      prevPercent = p;
      callback({ percent: p, ...rest });
    }
  };
};

const revision = getPuppeteerConfig().chromiumRevision;

let downloadProm: ReturnType<typeof download>;

export default async function downloadChromium(installPath?: string, onProgress?: OnProgress) {
  if (downloadProm) return downloadProm;

  downloadProm = download({
    revision,
    installPath,
    onProgress: onProgress && getIntegerPercent(onProgress),
    log: true
  });

  return downloadProm;
}
