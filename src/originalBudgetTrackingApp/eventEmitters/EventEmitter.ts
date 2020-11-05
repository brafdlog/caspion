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

export interface ErrorEvent extends BudgetTrackingEvent {
  error: Error
}

interface ImporterEvent extends BudgetTrackingEvent {
  id: string
  name: string
  companyKey: AccountToScrapeConfig['key']
}

interface ImporterErrorEvent extends ImporterEvent, ErrorEvent {
}

interface ImporterEndEvent extends ImporterEvent {
 transactions: EnrichedTransaction[]
}

interface ExporterEvent extends BudgetTrackingEvent {
  name: string
  allTransactions: EnrichedTransaction[]
}

interface ExporterErrorEvent extends ExporterEvent, ErrorEvent {

}

interface ImportProcessStartEvent extends BudgetTrackingEvent {
  startDate: Date
}

export type EventDataMap = {
  [EventNames.IMPORT_PROCESS_START]: ImportProcessStartEvent
  [EventNames.IMPORTER_START]: ImporterEvent
  [EventNames.IMPORTER_PROGRESS]: ImporterEvent
  [EventNames.IMPORTER_ERROR]: ImporterErrorEvent
  [EventNames.IMPORTER_END]: ImporterEndEvent
  [EventNames.IMPORT_PROCESS_END]: BudgetTrackingEvent
  [EventNames.EXPORT_PROCESS_START]: BudgetTrackingEvent
  [EventNames.EXPORTER_START]: ExporterEvent
  [EventNames.EXPORTER_PROGRESS]: ExporterEvent
  [EventNames.EXPORTER_ERROR]: ExporterErrorEvent
  [EventNames.EXPORTER_END]: ExporterEvent
  [EventNames.GENERAL_ERROR]: ErrorEvent
  [EventNames.LOG]: BudgetTrackingEvent
};

type EmptyEvents = EventNames.IMPORT_PROCESS_START | EventNames.IMPORT_PROCESS_END | EventNames.EXPORT_PROCESS_START | EventNames.EXPORT_PROCESS_END;

export class BudgetTrackingEventEmitter extends Emittery.Typed<EventDataMap, EmptyEvents> {

}

export type EventPublisher = Pick<BudgetTrackingEventEmitter, 'emit'>

export type EventSubscriber = Pick<BudgetTrackingEventEmitter, 'on' | 'once' | 'off' | 'onAny' | 'anyEvent' | 'offAny'>;
