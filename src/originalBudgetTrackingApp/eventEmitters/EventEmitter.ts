import Emittery from 'emittery';
import { AccountToScrapeConfig } from '@/originalBudgetTrackingApp/configManager/configManager';
import { EnrichedTransaction } from '@/originalBudgetTrackingApp/commonTypes';

export enum EventNames {
  IMPORT_PROCESS_START = 'IMPORT_PROCESS_START',
  IMPORTER_START = 'IMPORTER_START',
  IMPORTER_PROGRESS = 'IMPORTER_PROGRESS',
  IMPORTER_ERROR = 'IMPORTER_ERROR',
  IMPORTER_END = 'IMPORTER_END',
  IMPORT_PROCESS_END = 'IMPORT_PROCESS_END',
  EXPORT_PROCESS_START = 'EXPORT_PROCESS_START',
  EXPORTER_START = 'EXPORTER_START',
  EXPORTER_PROGRESS = 'EXPORTER_PROGRESS',
  EXPORTER_ERROR = 'EXPORTER_ERROR',
  EXPORTER_END = 'EXPORTER_END',
  EXPORT_PROCESS_END = 'EXPORT_PROCESS_END',
  GENERAL_ERROR = 'GENERAL_ERROR',
  LOG = 'LOG'
}

interface BudgetTrackingEvent {
  message?: string;
}

interface ImporterEvent extends BudgetTrackingEvent {
  id: string
  name: string
  companyKey: AccountToScrapeConfig['key']
}

interface ErrorEvent {
  error: Error
}

interface ImporterErrorEvent extends ImporterEvent, ErrorEvent {
}

interface ImporterEndEvent extends ImporterEvent {
 transactions: EnrichedTransaction[]
}

type EventDataMap = {
  [EventNames.IMPORT_PROCESS_START]: { startDate: Date, message: string }
  [EventNames.IMPORTER_START]: ImporterEvent
  [EventNames.IMPORTER_PROGRESS]: ImporterEvent
  [EventNames.IMPORTER_ERROR]: ImporterErrorEvent
  [EventNames.IMPORTER_END]: ImporterEndEvent
  [EventNames.IMPORT_PROCESS_END]: { message: string }
  [EventNames.EXPORT_PROCESS_START]: { message: string }
  [EventNames.EXPORTER_START]: { message: string }
  [EventNames.EXPORTER_PROGRESS]: { message: string }
  [EventNames.EXPORTER_ERROR]: { message: string }
  [EventNames.EXPORTER_END]: { message: string }
  [EventNames.GENERAL_ERROR]: ErrorEvent
  [EventNames.LOG]: { message: string }
};

type EmptyEvents = EventNames.IMPORT_PROCESS_START | EventNames.IMPORT_PROCESS_END;

export class BudgetTrackingEventEmitter extends Emittery.Typed<EventDataMap, EmptyEvents> {

}
