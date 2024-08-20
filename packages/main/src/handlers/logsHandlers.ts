import { getLastLines, getLogsFolder } from '@/logging/logger';

export const getLogsInfoHandler = (_: unknown, numOfLastLines: number) => {
  const lastLines = getLastLines(numOfLastLines);
  const logsFolder = getLogsFolder();
  return { lastLines, logsFolder };
};
