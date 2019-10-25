import download from 'download-chromium';
import { getPuppeteerConfig } from 'israeli-bank-scrapers-core';

const chromiumVersion = getPuppeteerConfig().chromiumRevision;

export default async function () {
  return download({ revision: chromiumVersion });
}
