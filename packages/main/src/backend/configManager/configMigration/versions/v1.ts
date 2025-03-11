// V1 adds the version field to the config object

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function migrateV0ToV1(v1Config: any): any {
  return {
    ...v1Config,
    version: 1,
  };
}
