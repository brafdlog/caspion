import { type EventPublisher } from '@/backend/eventEmitters/EventEmitter';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock the outputVendors module so we can inject controlled exporters.
vi.mock('@/backend/export/outputVendors', () => ({
  default: [],
}));

import outputVendors from '@/backend/export/outputVendors';
import { createTransactionsInExternalVendors } from './exportTransactions';

const noopEventPublisher: EventPublisher = {
  emit: vi.fn().mockResolvedValue(undefined),
};

function makeExporter(name: string, behavior: 'success' | 'fail', exported = 1) {
  return {
    name,
    init: vi.fn().mockResolvedValue(undefined),
    exportTransactions: vi.fn().mockImplementation(async () => {
      if (behavior === 'fail') {
        throw new Error(`${name} blew up`);
      }
      return { exportedTransactionsNum: exported };
    }),
  };
}

function setExporters(list: unknown[]) {
  // Mutate the mocked array in place so the module-level import in
  // exportTransactions.ts sees the new values.
  (outputVendors as unknown as unknown[]).length = 0;
  (outputVendors as unknown as unknown[]).push(...list);
}

describe('createTransactionsInExternalVendors', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('one exporter failing does not prevent other exporters from running', async () => {
    const failing = makeExporter('csv', 'fail');
    const succeeding = makeExporter('ynab', 'success', 5);
    setExporters([failing, succeeding]);

    const config = {
      csv: { active: true },
      ynab: { active: true },
    } as never;

    const result = await createTransactionsInExternalVendors(
      config,
      { companyA: [] as never[] },
      new Date('2025-01-01'),
      noopEventPublisher,
    );

    // The successful exporter should have run to completion even though csv threw.
    expect(succeeding.exportTransactions).toHaveBeenCalledTimes(1);
    expect(failing.exportTransactions).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('ynab');
    expect(result).not.toHaveProperty('csv');
  });

  test('does not reject when an exporter throws (promise resolves with partial result)', async () => {
    const failing = makeExporter('csv', 'fail');
    const succeeding = makeExporter('ynab', 'success', 3);
    setExporters([failing, succeeding]);

    const config = {
      csv: { active: true },
      ynab: { active: true },
    } as never;

    await expect(
      createTransactionsInExternalVendors(
        config,
        { companyA: [] as never[] },
        new Date('2025-01-01'),
        noopEventPublisher,
      ),
    ).resolves.toBeDefined();
  });
});
