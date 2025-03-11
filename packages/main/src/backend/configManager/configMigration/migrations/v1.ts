// V1 adds the version field to the config object

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function migrateV0ToV1(v0Config: any): any {
  return {
    ...v0Config,
    version: 1,
  };
}
