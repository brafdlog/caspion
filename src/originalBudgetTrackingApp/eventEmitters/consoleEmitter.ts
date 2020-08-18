/* eslint-disable class-methods-use-this */
import { ProgressEmitter, ScrapingEventEmitter, ScrapingEvents } from '../commonTypes';

export class ConsoleEmitter implements ScrapingEventEmitter {
  on<U extends 'status' | 'progress' | 'error' | 'finish'>(_event: U, _listener: ScrapingEvents[U]): this {
    throw new Error('Do not listen to this console emitter');
  }

  emit<U extends 'status' | 'progress' | 'error' | 'finish'>(event: U, ...args: Parameters<ScrapingEvents[U]>): boolean {
    console.log(event, ...args);
    return true;
  }

  listenTo(emitter: ProgressEmitter): void {
    emitter.onProgress(console.log);
  }
}
