import { z } from 'zod';
import { originalConfigSchema } from './original';

export const v1ConfigSchema = originalConfigSchema.extend({ version: z.literal(1) });

export function migrateOriginalToV1(v1Config: z.infer<typeof originalConfigSchema>): z.infer<typeof v1ConfigSchema> {
  return {
    ...v1Config,
    version: 1,
  };
}
