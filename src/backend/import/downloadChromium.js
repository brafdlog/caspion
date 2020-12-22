import download from 'download-chromium';
import { getPuppeteerConfig } from 'israeli-bank-scrapers-core';

const revision = getPuppeteerConfig().chromiumRevision;

export default async function downloadChromium(installPath, onProgress) {
  return download({
    revision,
    installPath,
    onProgress,
  });
}
