import logger, { LogFunctions, LogLevel } from 'electron-log'; // eslint-disable-line no-restricted-imports
import fs from 'fs';
import { EOL } from 'os';
import path from 'path';

export type Logger = LogFunctions
export type Levels = LogLevel

export const initLogger = (app: Electron.App) => {

  logger.info(`Welcome to ${app.getName()} log`);
  logger.info(`Version: ${app.getVersion()}`);

  const onError = (error: Error) => {
    logger.error(error.message || error);
    if (error.stack) logger.debug(error.stack);
  };
  logger.catchErrors({ onError });
};

export const getLastLines = (n: number) => {
  const lines = fs.readFileSync(logger.transports.file.getFile().path).toString().split(EOL);
  const lastLines = lines.slice(lines.length - n);
  return lastLines.join(EOL);
};

export const getLogsFolder = () => path.dirname(logger.transports.file.getFile().path);

export default logger as Logger;
