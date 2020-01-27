import logger from 'electron-log';

export default function CreateLogger(app) {
  logger.info(`Welcome to ${app.getName()} log`);
  logger.info(`Version: ${app.getVersion()}`);

  const onError = (error) => logger.error(error);
  logger.catchErrors({ onError });

  return logger;
}
