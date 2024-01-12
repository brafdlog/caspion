import { BudgetTrackingEventEmitter, EventPublisher } from '@/backend/eventEmitters/EventEmitter';

interface Logger {
  info: (...params: any[]) => void
}

export function buildLoggerEmitter(logger: Logger): EventPublisher {
  const loggerEmitter = new BudgetTrackingEventEmitter();
  loggerEmitter.onAny((eventName, eventData) => {
    logger.info(`${eventName}:`, eventData);
  });
  return loggerEmitter;
}
