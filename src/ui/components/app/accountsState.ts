// eslint-disable-next-line max-classes-per-file
import { UnwrapRef } from 'vue';
import { Events } from '@/backend';
import { AccountStatus, AccountType } from '@/backend/eventEmitters/EventEmitter';
import { Levels } from '@/logging/logger';

export class AccountState {
  id: string;

  name: string;

  status: AccountStatus;

  events: Events.BudgetTrackingEvent[];

  constructor({ id, name }) {
    this.id = id;
    this.name = name;
    this.status = AccountStatus.IDLE;
    this.events = [];
  }

  clear() {
    this.status = AccountStatus.IDLE;
    this.events = [];
  }
}

export class ImporterState extends AccountState {

}

export class ExporterState extends AccountState {

}

export class AccountsState {
  importers: ImporterState[];

  exporters: ExporterState[];

  constructor(importersConfig: readonly { id: string, name: string }[], exportersConfig: readonly { id: string, name: string }[]) {
    this.importers = importersConfig.map((importer) => new ImporterState(importer));
    this.exporters = exportersConfig.map((exporter) => new ExporterState(exporter));
  }

  clear() {
    this.importers.forEach((importer) => importer.clear());
    this.exporters.forEach((exporter) => exporter.clear());
  }

  setPendingStatus() {
    this.importers.forEach((importer) => importer.status = AccountStatus.PENDING);
    this.exporters.forEach((exporter) => exporter.status = AccountStatus.PENDING);
  }
}

export function handleEvent(event: Events.BudgetTrackingEvent & { level: Levels }, accountsState: UnwrapRef<AccountsState>) {
  let accountState: AccountState | undefined;
  if (event.accountType === AccountType.IMPORTER) {
    accountState = accountsState.importers.find(({ id }) => id === event.vendorId);
  } else if (event.accountType === AccountType.EXPORTER) {
    accountState = accountsState.exporters.find(({ id }) => id === event.vendorId);
  }

  if (accountState) {
    accountState.events.push(event);
    if (event.accountStatus) {
      accountState.status = event.accountStatus;
    }
  }
}
