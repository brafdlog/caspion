import logger from 'electron-log';

export default function CreateLogger(app) {
  logger.info(`Welcome to ${app.getName()} log`);
  logger.info(`Version: ${app.getVersion()}`);

  const onError = (error) => {
    logger.error(error.message ? error.message : error);
    if (error.stack) logger.trace(error.stack);
  };
  logger.catchErrors({ onError });

  return logger;
}
