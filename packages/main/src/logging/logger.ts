import { App } from '@/app-globals';
import { type LogFunctions, type LogLevel, type MainErrorHandlerOptions } from 'electron-log';
import logger from 'electron-log'; // eslint-disable-line no-restricted-imports
import fs from 'fs';
import { EOL } from 'os';
import path from 'path';

export type Logger = LogFunctions;
export type Levels = LogLevel;

logger.info(`Welcome to ${App.getName()} log`);
logger.info(`Version: ${App.getVersion()}`);

const onError: MainErrorHandlerOptions['onError'] = ({ error }) => {
  logger.error(error.message || error);
  if (error.stack) logger.debug(error.stack);
};
logger.errorHandler.startCatching({ onError });
logger.catchErrors({onError});

export const getLastLines = (n: number) => {
  const lines = fs.readFileSync(logger.transports.file.getFile().path).toString().split(EOL);
  const lastLines = lines.slice(lines.length - n);
  return lastLines.join(EOL);
};

export const getLogsFolder = () => path.dirname(logger.transports.file.getFile().path);

export default logger as Logger;
