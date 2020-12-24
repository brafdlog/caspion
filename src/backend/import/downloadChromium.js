import download from 'download-chromium';
import { getPuppeteerConfig } from 'israeli-bank-scrapers-core';

const revision = getPuppeteerConfig().chromiumRevision;

let pathPrms

export default async function downloadChromium(installPath, onProgress) {
  console.log({ pathPrms })
  if (pathPrms) return pathPrms;

  pathPrms = download({
    revision,
    installPath,
    onProgress,
  })

  return pathPrms
}
