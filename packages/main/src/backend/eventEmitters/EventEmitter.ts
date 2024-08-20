// eslint-disable-next-line max-classes-per-file
import Emittery from 'emittery';
import { type CompanyTypes } from 'israeli-bank-scrapers-core';
import { type EnrichedTransaction, type OutputVendorName } from '@/backend/commonTypes';

export enum EventNames {
  IMPORT_PROCESS_START = 'IMPORT_PROCESS_START',
  DOWNLOAD_CHROME = 'DOWNLOAD_CHROME',
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
  IDLE = 'idle',
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
  ERROR = 'error'
}

export class BudgetTrackingEvent {
  message: string;

  vendorId?: CompanyTypes | OutputVendorName;

  accountStatus?: AccountStatus;

  error?: Error;

  accountType?: AccountType;

  constructor({
    message, vendorId, error, accountType, accountStatus = AccountStatus.IN_PROGRESS,
  }: BudgetTrackingEvent) {
    this.message = message;
    this.vendorId = vendorId;
    this.error = error;
    this.accountType = accountType;
    this.accountStatus = accountStatus;
  }
}

export interface ImporterEventParams {
  message: BudgetTrackingEvent['message'];
  importerKey: CompanyTypes;
  error?: BudgetTrackingEvent['error'];
  status?: BudgetTrackingEvent['accountStatus'];
}

export class ImporterEvent extends BudgetTrackingEvent {
  constructor({
    message, importerKey, error, status,
  }: ImporterEventParams) {
    super({
      message, vendorId: importerKey, error, accountType: AccountType.IMPORTER, accountStatus: status,
    });
  }
}

export interface ExporterEventParams {
  message: string;
  exporterName: OutputVendorName;
  allTransactions: EnrichedTransaction[];
  status?: AccountStatus;
  error?: Error;
}

export class ExporterEvent extends BudgetTrackingEvent {
  allTransactions: EnrichedTransaction[];

  constructor({
    message, allTransactions, status, error, exporterName,
  }: ExporterEventParams) {
    super({
      message, accountType: AccountType.EXPORTER, accountStatus: status, error, vendorId: exporterName,
    });
    this.allTransactions = allTransactions;
  }
}

export class ExporterEndEvent extends ExporterEvent {
  exportedTransactionsNum: number;

  constructor(exporterEventParams: ExporterEventParams & { exportedTransactionsNum: number }) {
    super(exporterEventParams);
    this.exportedTransactionsNum = exporterEventParams.exportedTransactionsNum;
  }
}

export class DownalodChromeEvent extends BudgetTrackingEvent {
  percent: number;

  constructor(percent: number) {
    super({ message: `Download Chrome: ${percent}%` });
    this.percent = percent;
  }
}

export interface EventDataMap {
  [EventNames.IMPORT_PROCESS_START]: BudgetTrackingEvent
  [EventNames.DOWNLOAD_CHROME]: DownalodChromeEvent
  [EventNames.IMPORTER_START]: ImporterEvent
  [EventNames.IMPORTER_PROGRESS]: ImporterEvent
  [EventNames.IMPORTER_ERROR]: ImporterEvent
  [EventNames.IMPORTER_END]: ImporterEvent
  [EventNames.IMPORT_PROCESS_END]: undefined
  [EventNames.EXPORT_PROCESS_START]: undefined
  [EventNames.EXPORT_PROCESS_END]: undefined
  [EventNames.EXPORTER_START]: ExporterEvent
  [EventNames.EXPORTER_PROGRESS]: ExporterEvent
  [EventNames.EXPORTER_ERROR]: ExporterEvent
  [EventNames.EXPORTER_END]: ExporterEndEvent
  [EventNames.GENERAL_ERROR]: BudgetTrackingEvent
  [EventNames.LOG]: BudgetTrackingEvent
}

export class BudgetTrackingEventEmitter extends Emittery<EventDataMap> {

}

export type EventPublisher = Pick<BudgetTrackingEventEmitter, 'emit'>

export type EventSubscriber = Pick<BudgetTrackingEventEmitter, 'on' | 'once' | 'off' | 'onAny' | 'anyEvent' | 'offAny'>;
