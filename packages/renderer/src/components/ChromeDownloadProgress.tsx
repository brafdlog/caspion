import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useConfigStore } from '../store/ConfigStore';

const ChromeDownloadProgress = () => {
  const configStore = useConfigStore();

  const label = useMemo(
    () =>
      configStore.chromeDownloadPercent && configStore.chromeDownloadPercent === 100
        ? 'Download Completed'
        : `Downloading Chrome ${configStore.chromeDownloadPercent}%`,
    [configStore.chromeDownloadPercent],
  );

  if (!configStore.chromeDownloadPercent) {
    return null;
  }

  return <ProgressBar now={configStore.chromeDownloadPercent} label={label} className='w-100' />;
};

export default observer(ChromeDownloadProgress);
