import { z } from 'zod';
import { type Config } from '../../commonTypes';
import { isOriginalConfig } from './versions/original';
import { v1ConfigSchema } from './versions/v1';

const latestConfigSchema = v1ConfigSchema;

// migrations[n] should be a function that converts version n to version n+1
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const migrations: Record<number, (config: any) => any> = {};

export function migrateConfig(config: unknown): Config {
  let currentConfig = config;
  // original config does not have version key and must be handled separately
  if (isOriginalConfig(config)) {
    return config as Config;
  }
  let currentVersion = getConfigVersion(currentConfig);

  while (migrations[currentVersion]) {
    currentConfig = migrations[currentVersion](currentConfig);
    currentVersion = getConfigVersion(currentConfig);
  }

  return latestConfigSchema.parse(currentConfig) as Config;
}

function getConfigVersion(config: unknown): keyof typeof migrations {
  const versionSchema = z.object({ version: z.number().int().positive() });
  return versionSchema.parse(config).version;
}
