import logger from 'electron-log';
import fs from 'fs';
import { EOL } from 'os';

export default function CreateLogger(app) {
  logger.info(`Welcome to ${app.getName()} log`);
  logger.info(`Version: ${app.getVersion()}`);

  const onError = (error) => {
    logger.error(error.message ? error.message : error);
    if (error.stack) logger.trace(error.stack);
  };
  logger.catchErrors({ onError });

  logger.getLastLines = (n) => {
    const lines = fs.readFileSync(logger.transports.file.getFile().path).toString().split(EOL);
    const lastLines = lines.slice(lines.length - n);
    return lastLines.join(EOL);
  };

  return logger;
}
