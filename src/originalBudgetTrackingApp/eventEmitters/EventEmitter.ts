// eslint-disable-next-line max-classes-per-file
import Emittery from 'emittery';
import { EnrichedTransaction } from '@/originalBudgetTrackingApp/commonTypes';
import { CompanyTypes } from 'israeli-bank-scrapers-core';

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

type BudgetTrackingEventParam = {
  message: string;
  vendorId?: string;
  vendorName?: string;
  error?: Error
}

// Make BudgetTrackingEvent and ErrorEvent interfaces, and the rest classes that implement them

export class BudgetTrackingEvent {
  message: string;

  vendorId?: string

  vendorName?: string

  error?: Error;

  constructor({
    message, vendorId, vendorName, error
  }: BudgetTrackingEventParam) {
    this.message = message;
    this.vendorId = vendorId;
    this.vendorName = vendorName;
    this.error = error;
  }
}

export class ErrorEvent extends BudgetTrackingEvent {
  constructor(error: Error) {
    super({ message: error.message, error });
  }
}

export class ImporterEvent extends BudgetTrackingEvent {
  constructor({
    message, importerName, importerKey, error
  }: { message: string, importerName: string, importerKey: CompanyTypes, error?: Error }) {
    super({
      message, vendorId: importerKey, vendorName: importerName, error
    });
  }
}

export type ExporterEventParams = {
  message: string, exporterName: string, allTransactions: EnrichedTransaction[]
}

export class ExporterEvent extends BudgetTrackingEvent {
  allTransactions: EnrichedTransaction[];

  constructor({ message, exporterName, allTransactions }: ExporterEventParams) {
    super({ message, vendorName: exporterName });
    this.allTransactions = allTransactions;
  }
}

export class ExporterErrorEvent extends ExporterEvent implements ErrorEvent {
  error: Error;

  constructor(error: Error, exporterName: string, allTransactions: EnrichedTransaction[]) {
    super({ message: error.message, exporterName, allTransactions });
    this.error = error;
  }
}

interface ImportProcessStartEvent extends BudgetTrackingEvent {
  startDate: Date
}

export type EventDataMap = {
  [EventNames.IMPORT_PROCESS_START]: ImportProcessStartEvent
  [EventNames.IMPORTER_START]: ImporterEvent
  [EventNames.IMPORTER_PROGRESS]: ImporterEvent
  [EventNames.IMPORTER_ERROR]: ImporterEvent
  [EventNames.IMPORTER_END]: ImporterEvent
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
