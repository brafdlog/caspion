import { z } from 'zod';

export const outputVendorNameSchema = z.enum(['ynab', 'googleSheets', 'json', 'csv']);

export const companyTypeSchema = z.enum([
  'hapoalim',
  'hapoalimBeOnline',
  'beinleumi',
  'union',
  'amex',
  'isracard',
  'visaCal',
  'max',
  'leumiCard',
  'otsarHahayal',
  'discount',
  'mercantile',
  'mizrahi',
  'leumi',
  'massad',
  'yahav',
  'behatsdaa',
  'beyahadBishvilha',
  'oneZero',
  'pagi',
]);

export const googleSheetsConfigSchema = z.object({
  active: z.boolean(),
  options: z.object({
    credentials: z.any(),
    spreadsheetId: z.string(),
  }),
});

export const ynabConfigSchema = z.object({
  active: z.boolean(),
  options: z.object({
    accessToken: z.string(),
    accountNumbersToYnabAccountIds: z.record(z.string(), z.string()),
    budgetId: z.string(),
    maxPayeeNameLength: z.number().optional(),
  }),
});

export const jsonConfigSchema = z.object({
  active: z.boolean(),
  options: z.object({
    filePath: z.string(),
  }),
});

export const csvConfigSchema = z.object({
  active: z.boolean(),
  options: z.object({
    filePath: z.string(),
  }),
});

export const outputVendorsSchema = z.object({
  [outputVendorNameSchema.Values.googleSheets]: googleSheetsConfigSchema.optional(),
  [outputVendorNameSchema.Values.ynab]: ynabConfigSchema.optional(),
  [outputVendorNameSchema.Values.json]: jsonConfigSchema.optional(),
  [outputVendorNameSchema.Values.csv]: csvConfigSchema.optional(),
});

export const accountToScrapeConfigSchema = z.object({
  id: z.string(),
  key: companyTypeSchema,
  name: z.string(),
  loginFields: z.any(),
  active: z.boolean().optional(),
});

export const scrapingSchema = z.object({
  numDaysBack: z.number(),
  showBrowser: z.boolean(),
  accountsToScrape: z.array(accountToScrapeConfigSchema),
  chromiumPath: z.string().optional(),
  maxConcurrency: z.number().optional(),
  timeout: z.number(),
  periodicScrapingIntervalHours: z.number().optional(),
});

export const originalConfigSchema = z.object({
  outputVendors: outputVendorsSchema,
  scraping: scrapingSchema,
  useReactUI: z.boolean().optional(),
});

export function isOriginalConfig(obj: unknown): obj is z.infer<typeof originalConfigSchema> {
  const parseResult = originalConfigSchema.strict().safeParse(obj);
  return parseResult.success;
}
