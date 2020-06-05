import download from 'download-chromium';
import { getPuppeteerConfig } from 'israeli-bank-scrapers-core';

const revision = getPuppeteerConfig().chromiumRevision;

export default async function (installPath, onProgress) {
  onProgress({ percent: 0.02, message: 'Step 1: Downloading Chrome...' });
  // onProgress: track download progress. receives one argument { percent, transferred, total }
  return download({
    revision,
    installPath,
    onProgress,
  });
}
