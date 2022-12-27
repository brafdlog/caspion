import { getLastLines, getLogsFolder } from '@/logging/logger';

export const getLogsInfoHandler = (numOfLines:number = 10) => {
  const lastLines = getLastLines(numOfLines);
  const logsFolder = getLogsFolder();
  return { lastLines, logsFolder };
};
