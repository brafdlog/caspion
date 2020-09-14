/* eslint-disable class-methods-use-this */
import { BudgetTrackingEventEmitter } from '@/originalBudgetTrackingApp/eventEmitters/EventEmitter';

export function buildConsoleEmitter(): BudgetTrackingEventEmitter {
  const consoleEmitter = new BudgetTrackingEventEmitter();
  consoleEmitter.onAny((eventName, eventData) => {
    // eslint-disable-next-line no-console
    console.log(`${eventName}:`, eventData);
  });
  return consoleEmitter;
}
