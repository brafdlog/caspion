import { BudgetTrackingEventEmitter, EventPublisher } from './EventEmitter';

export function buildCompositeEventPublisher(eventPublishers: EventPublisher[]): EventPublisher {
  const compositeEmitter = new BudgetTrackingEventEmitter();

  compositeEmitter.onAny(((eventName, eventData) => {
    // @ts-ignore
    eventPublishers.map((eventPublisher) => eventPublisher.emit(eventName, eventData));
  }));
  return compositeEmitter;
}
