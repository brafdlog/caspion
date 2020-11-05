import { EventEmitter } from '@/originalBudgetTrackingApp';
import { EventNames } from '@/originalBudgetTrackingApp/eventEmitters/EventEmitter';
import { Levels, LogEntry } from '../shared/log/types';

export default (callback: (entry: LogEntry) => void) => {
  const eventPublisher = new EventEmitter.BudgetTrackingEventEmitter();

  eventPublisher.onAny((eventName, data) => {
    const message = data?.message || eventName;

    switch (eventName) {
      case EventNames.GENERAL_ERROR:
      case EventNames.IMPORTER_ERROR:
        return callback({ message, level: Levels.Error });
      default:
        return callback({ message, level: Levels.Info });
    }
  });

  return eventPublisher;
};
