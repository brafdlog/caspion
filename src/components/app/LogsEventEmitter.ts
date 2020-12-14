import { EventEmitter, BudgetTrackingEvent } from '@/originalBudgetTrackingApp';
import { Levels } from '../shared/log/types';

export default (callback: (entry: BudgetTrackingEvent & { level: Levels }) => void) => {
  const eventPublisher = new EventEmitter.BudgetTrackingEventEmitter();

  eventPublisher.onAny((eventName, data) => {
    const message = data?.message || eventName;
    const logLevel = data?.error ? Levels.Error : Levels.Info;
    return callback({ ...data, message, level: logLevel });
  });

  return eventPublisher;
};
