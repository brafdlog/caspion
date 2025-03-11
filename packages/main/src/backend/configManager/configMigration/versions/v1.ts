// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function migrateOriginalToV1(v1Config: any): any {
  return {
    ...v1Config,
    version: 1,
  };
}
