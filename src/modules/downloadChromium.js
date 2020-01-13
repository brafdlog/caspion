import download from 'download-chromium';
import { getPuppeteerConfig } from 'israeli-bank-scrapers-core';

const revision = getPuppeteerConfig().chromiumRevision;

export default async function (installPath, onProgress) {
  onProgress({ percent: 0 }, 'Step 1: Downloading Chrome...');
  return download({
    revision, installPath, onProgress,
  });
}
