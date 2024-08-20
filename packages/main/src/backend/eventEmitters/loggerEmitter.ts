import { type EventPublisher } from '@/backend/eventEmitters/EventEmitter';
import { BudgetTrackingEventEmitter } from '@/backend/eventEmitters/EventEmitter';

interface Logger {
  info: (...params: unknown[]) => void
}

export function buildLoggerEmitter(logger: Logger): EventPublisher {
  const loggerEmitter = new BudgetTrackingEventEmitter();
  loggerEmitter.onAny((eventName, eventData) => {
    logger.info(`${eventName}:`, eventData);
  });
  return loggerEmitter;
}
