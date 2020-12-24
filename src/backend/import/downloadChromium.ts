import download from 'download-chromium';
import { getPuppeteerConfig } from 'israeli-bank-scrapers-core';

type OnProgress = ({ percent, transferred, total }) => void
type DownloadOptions = {
  platform: string,
  revision: string,
  log: boolean,
  onProgress: OnProgress
  installPath: string
}
type Download = (options: Partial<DownloadOptions>) => string

const revision = getPuppeteerConfig().chromiumRevision;

export default async function downloadChromium(installPath?: string, onProgress?: OnProgress) {
  const func: Download = download;
  return func({
    revision,
    installPath,
    onProgress,
  });
}
