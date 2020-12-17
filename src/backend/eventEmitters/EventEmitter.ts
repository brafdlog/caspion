// eslint-disable-next-line max-classes-per-file
import Emittery from 'emittery';
import { EnrichedTransaction, OutputVendorName } from '@/backend/commonTypes';
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

export class BudgetTrackingEvent {
  message: string;

  vendorId?: CompanyTypes | OutputVendorName;

  accountStatus?: AccountStatus;

  error?: Error;

  accountType?: AccountType;

  constructor({
    message, vendorId, error, accountType, accountStatus = AccountStatus.IN_PROGRESS
  }: BudgetTrackingEvent) {
    this.message = message;
    this.vendorId = vendorId;
    this.error = error;
    this.accountType = accountType;
    this.accountStatus = accountStatus;
  }
}

export type ImporterEventParams = {
  message: BudgetTrackingEvent['message'];
  importerKey: CompanyTypes;
  error?: BudgetTrackingEvent['error'];
  status?: BudgetTrackingEvent['accountStatus'];
}

export class ImporterEvent extends BudgetTrackingEvent {
  constructor({
    message, importerKey, error, status
  }: ImporterEventParams) {
    super({
      message, vendorId: importerKey, error, accountType: AccountType.IMPORTER, accountStatus: status
    });
  }
}

export type ExporterEventParams = {
  message: string;
  exporterName: OutputVendorName;
  allTransactions: EnrichedTransaction[];
  status?: AccountStatus;
  error?: Error;
}

export class ExporterEvent extends BudgetTrackingEvent {
  allTransactions: EnrichedTransaction[];

  constructor({
    message, allTransactions, status, error, exporterName
  }: ExporterEventParams) {
    super({
      message, accountType: AccountType.EXPORTER, accountStatus: status, error, vendorId: exporterName
    });
    this.allTransactions = allTransactions;
  }
}

export type EventDataMap = {
  [EventNames.IMPORT_PROCESS_START]: BudgetTrackingEvent
  [EventNames.IMPORTER_START]: ImporterEvent
  [EventNames.IMPORTER_PROGRESS]: ImporterEvent
  [EventNames.IMPORTER_ERROR]: ImporterEvent
  [EventNames.IMPORTER_END]: ImporterEvent
  [EventNames.IMPORT_PROCESS_END]: BudgetTrackingEvent
  [EventNames.EXPORT_PROCESS_START]: BudgetTrackingEvent
  [EventNames.EXPORTER_START]: ExporterEvent
  [EventNames.EXPORTER_PROGRESS]: ExporterEvent
  [EventNames.EXPORTER_ERROR]: ExporterEvent
  [EventNames.EXPORTER_END]: ExporterEvent
  [EventNames.GENERAL_ERROR]: BudgetTrackingEvent
  [EventNames.LOG]: BudgetTrackingEvent
};

type EmptyEvents = EventNames.IMPORT_PROCESS_START | EventNames.IMPORT_PROCESS_END | EventNames.EXPORT_PROCESS_START | EventNames.EXPORT_PROCESS_END;

export class BudgetTrackingEventEmitter extends Emittery.Typed<EventDataMap, EmptyEvents> {

}

export type EventPublisher = Pick<BudgetTrackingEventEmitter, 'emit'>

export type EventSubscriber = Pick<BudgetTrackingEventEmitter, 'on' | 'once' | 'off' | 'onAny' | 'anyEvent' | 'offAny'>;
