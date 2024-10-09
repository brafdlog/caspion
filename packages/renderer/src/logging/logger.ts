import type {
  LogFunctions,
  LogLevel,
  MainErrorHandlerOptions,
} from 'electron-log';
import log from 'electron-log/renderer';

const logger = log.scope('renderer');

export type Logger = LogFunctions;
export type Levels = LogLevel;

logger.info('Welcome to Caspion log');
logger.info('Version: <need implementation>');

const onError: MainErrorHandlerOptions['onError'] = ({ error }) => {
  logger.error(error.message || error);
  if (error.stack) logger.debug(error.stack);
};
log.errorHandler.startCatching({ onError });
Object.assign(console, log.functions);

export default logger as Logger;
