/* eslint-disable class-methods-use-this */
import { EventNames, EventPublisher } from '@/originalBudgetTrackingApp/eventEmitters/EventEmitter';

export default class ConsoleEmitter implements EventPublisher {
  async emit(eventName: EventNames, eventData?: any) {
    // eslint-disable-next-line no-console
    console.log(`${eventName}:`, eventData);
  }
}
