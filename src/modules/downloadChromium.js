import download from 'download-chromium';
import { getPuppeteerConfig } from '@brafdlog/israeli-bank-scrapers-core';

const revision = getPuppeteerConfig().chromiumRevision;

let chromePath;

export default async function downloadChromium(installPath, onProgress) {
  if (!chromePath) {
    onProgress({ percent: 0.02, message: 'Step 1: Downloading Chrome...' });
    // onProgress: track download progress. receives one argument { percent, transferred, total }
    chromePath = download({
      revision,
      installPath,
      onProgress,
    });
  }
  return chromePath;
}
