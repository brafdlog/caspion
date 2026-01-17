import type { LogFunctions, LogLevel, MainErrorHandlerOptions } from 'electron-log';
import log from 'electron-log/renderer';
import { sanitizeString } from './sanitizer';

const logger = log.scope('renderer');

export type Logger = LogFunctions;
export type Levels = LogLevel;

logger.info('Welcome to Caspion log (renderer)');

// Add a hook to sanitize all log messages before they're written
log.hooks.push((message) => {
  message.data = message.data.map((item) => {
    if (typeof item === 'string') {
      return sanitizeString(item);
    }
    return item;
  });
  return message;
});

const onError: MainErrorHandlerOptions['onError'] = ({ error }) => {
  logger.error(error.message || error);
  if (error.stack) logger.debug(error.stack);
};
log.errorHandler.startCatching({ onError });
Object.assign(console, log.functions);

export default logger as Logger;
