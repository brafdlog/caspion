/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Config } from '@/backend/commonTypes';
import { migrateV0ToV1 } from './versions/v1';

// migrations[n] should be a function that converts version n to version n+1
const migrations: Record<number, (config: any) => any> = {
  0: migrateV0ToV1,
};

export function migrateConfig(config: any): Config {
  let currentConfig = config;
  let currentVersion = getConfigVersion(currentConfig);

  while (migrations[currentVersion]) {
    currentConfig = migrations[currentVersion](currentConfig);
    currentVersion = getConfigVersion(currentConfig);
  }

  return currentConfig as Config;
}

function getConfigVersion(config: any): keyof typeof migrations {
  // Prior to v1, the config didn't have a version field.
  // In that case, we treat it as v0.
  return config.version ?? 0;
}
