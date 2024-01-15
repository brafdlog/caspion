import { getLastLines, getLogsFolder } from '@/logging/logger';

export const getLogsInfoHandler = (event, numOfLastLines: number) => {
  const lastLines = getLastLines(numOfLastLines);
  const logsFolder = getLogsFolder();
  return { lastLines, logsFolder };
};
