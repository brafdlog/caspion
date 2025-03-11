import { type Config } from '../../commonTypes';
import { migrateOriginalToV1 } from './versions/v1';

// migrations[n] should be a function that converts version n to version n+1
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const migrations: Record<number, (config: any) => any> = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function migrateConfig(config: any): Config {
  let currentConfig = config;
  // original config does not have version key and must be handled separately
  if (config.version === undefined) {
    currentConfig = migrateOriginalToV1(config);
  }
  let currentVersion = getConfigVersion(currentConfig);

  while (migrations[currentVersion]) {
    currentConfig = migrations[currentVersion](currentConfig);
    currentVersion = getConfigVersion(currentConfig);
  }

  return currentConfig as Config;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getConfigVersion(config: any): keyof typeof migrations {
  return config.version;
}
