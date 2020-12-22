/* eslint-disable class-methods-use-this */
import { BudgetTrackingEventEmitter, EventPublisher } from '@/backend/eventEmitters/EventEmitter';

export function buildConsoleEmitter(): EventPublisher {
  const consoleEmitter = new BudgetTrackingEventEmitter();
  consoleEmitter.onAny((eventName, eventData) => {
    // eslint-disable-next-line no-console
    console.log(`${eventName}:`, eventData);
  });
  return consoleEmitter;
}
