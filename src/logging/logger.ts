import { App } from '@/app-globals';
import logger, { LogFunctions, LogLevel } from 'electron-log'; // eslint-disable-line no-restricted-imports
import fs from 'fs';
import { EOL } from 'os';

export type Logger = LogFunctions
export type Levels = LogLevel

logger.info(`Welcome to ${App.getName()} log`);
logger.info(`Version: ${App.getVersion()}`);

const onError = (error: Error) => {
  logger.error(error.message || error);
  if (error.stack) logger.debug(error.stack);
};
logger.catchErrors({ onError });

export const getLastLines = (n: number) => {
  const lines = fs.readFileSync(logger.transports.file.getFile().path).toString().split(EOL);
  const lastLines = lines.slice(lines.length - n);
  return lastLines.join(EOL);
};

export default logger as Logger;
