import { App } from '@/app-globals';
import type { LogFunctions, LogLevel, MainErrorHandlerOptions } from 'electron-log';
import log from 'electron-log/main';
import fs from 'fs';
import { EOL } from 'os';
import path from 'path';

log.initialize();

// This will transport the logs to the renderer process (DevTools) in production too
log.transports.ipc.level = log.transports.file.level;

Object.assign(console, log.functions);
const logger = log.scope('main');

export type Logger = LogFunctions;
export type Levels = LogLevel;

logger.info(`Welcome to ${App.getName()} log`);
logger.info(`Version: ${App.getVersion()}`);

const onError: MainErrorHandlerOptions['onError'] = ({ error }) => {
  logger.error(error.message || error);
  if (error.stack) logger.debug(error.stack);
};
log.errorHandler.startCatching({ onError });

export const getLastLines = (n: number) => {
  const lines = fs.readFileSync(log.transports.file.getFile().path).toString().split(EOL);
  const lastLines = lines.slice(lines.length - n);
  return lastLines.join(EOL);
};

export const getLogsFolder = () => path.dirname(log.transports.file.getFile().path);

logger.info(`Logs folder: ${getLogsFolder()}`);

export default logger as Logger;
