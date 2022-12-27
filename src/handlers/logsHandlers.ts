import { getLastLines, getLogsFolder } from '@/logging/logger';

export const getLogsInfoHandler = () => {
  const lastLines = getLastLines(10); // not really working
  const logsFolder = getLogsFolder();
  return { lastLines, logsFolder };
};
