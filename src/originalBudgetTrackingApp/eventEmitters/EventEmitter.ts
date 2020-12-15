// eslint-disable-next-line max-classes-per-file
import Emittery from 'emittery';
import { EnrichedTransaction, OutputVendorName } from '@/originalBudgetTrackingApp/commonTypes';
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

export enum AccountType {
  IMPORTER, EXPORTER
}

export enum AccountStatus {
  IDLE, PENDING, IN_PROGRESS, DONE, ERROR
}

type BudgetTrackingEventParam = {
  message: string;
  vendorId?: CompanyTypes | OutputVendorName;
  vendorName?: string;
  error?: Error;
  accountType?: AccountType;
  accountStatus?: AccountStatus;
}

export class BudgetTrackingEvent {
  message: string;

  vendorId?: string;

  vendorName?: string;

  accountStatus?: BudgetTrackingEventParam['accountStatus'];

  error?: Error;

  accountType?: BudgetTrackingEventParam['accountType'];

  constructor({
    message, vendorId, vendorName, error, accountType, accountStatus = AccountStatus.IN_PROGRESS
  }: BudgetTrackingEventParam) {
    this.message = message;
    this.vendorId = vendorId;
    this.vendorName = vendorName;
    this.error = error;
    this.accountType = accountType;
    this.accountStatus = accountStatus;
  }
}

export class ErrorEvent extends BudgetTrackingEvent {
  constructor(error: Error) {
    super({ message: error.message, error });
  }
}

export class ImporterEvent extends BudgetTrackingEvent {
  constructor({
    message, importerName, importerKey, error, status
  }: { message: string, importerName: string, importerKey: CompanyTypes, error?: Error, status?: AccountStatus }) {
    super({
      message, vendorId: importerKey, vendorName: importerName, error, accountType: AccountType.IMPORTER, accountStatus: status
    });
  }
}

export type ExporterEventParams = {
  message: string, exporterName: OutputVendorName, allTransactions: EnrichedTransaction[], status?: AccountStatus
}

export class ExporterEvent extends BudgetTrackingEvent {
  allTransactions: EnrichedTransaction[];

  constructor({
    message, exporterName, allTransactions, status
  }: ExporterEventParams) {
    super({
      message, vendorName: exporterName, accountType: AccountType.EXPORTER, accountStatus: status
    });
    this.allTransactions = allTransactions;
  }
}

export class ExporterErrorEvent extends ExporterEvent implements ErrorEvent {
  error: Error;

  constructor(error: Error, exporterName: OutputVendorName, allTransactions: EnrichedTransaction[]) {
    super({
      message: error.message, exporterName, allTransactions, status: AccountStatus.ERROR
    });
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
