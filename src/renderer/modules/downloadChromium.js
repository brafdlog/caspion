import download from 'download-chromium';
import { getPuppeteerConfig } from 'israeli-bank-scrapers-core';

const revision = getPuppeteerConfig().chromiumRevision;

export default async function (installPath) {
  return download({
    revision, installPath,
  });
}
