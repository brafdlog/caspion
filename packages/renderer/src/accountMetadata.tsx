import mapValues from 'lodash/mapValues';
import { exporterIcons, importerIcons } from './assets';
import {
  type Account,
  type AccountMetadata,
  AccountType,
  CompanyTypes,
  type CsvConfig,
  ExporterResultType,
  type ExportResultMetadata,
  type GoogleSheetsConfig,
  type JsonConfig,
  OutputVendorName,
  type YnabConfig,
} from './types';

const icons = {
  ...importerIcons,
  ...exporterIcons,
};

const accountIdToDisplayName: Record<CompanyTypes | OutputVendorName, string> =
  {
    [CompanyTypes.MAX]: 'Max',
    [CompanyTypes.AMEX]: 'אמריקן אקספרס',
    [CompanyTypes.BEINLEUMI]: 'הבינלאומי',
    [CompanyTypes.HAPOALIM_BE_ONLINE]: 'הפועלים בי אונליין',
    [CompanyTypes.ISRACARD]: 'ישראכרט',
    [CompanyTypes.LEUMI_CARD]: 'לאומי קארד',
    [CompanyTypes.OTSAR_HAHAYAL]: 'אוצר החייל',
    [CompanyTypes.UNION]: 'איגוד',
    [CompanyTypes.LEUMI]: 'לאומי',
    [CompanyTypes.MIZRAHI]: 'מזרחי',
    [CompanyTypes.HAPOALIM]: 'הפועלים',
    [CompanyTypes.VISACAL]: 'ויזה כאל',
    [CompanyTypes.DISCOUNT]: 'דיסקונט',
    [CompanyTypes.YAHAV]: 'יהב',
    [CompanyTypes.BEYAHAD_BISHVILHA]: 'ביחד בשבילך',
    [CompanyTypes.MASSAD]: 'מסד',
    [CompanyTypes.BEHATSDAA]: 'בהצדעה',
    [CompanyTypes.MERCANTILE]: 'מרכנתיל',
    [OutputVendorName.CSV]: 'אקסל',
    [OutputVendorName.GOOGLE_SHEETS]: 'Google Sheets',
    [OutputVendorName.YNAB]: 'Ynab',
    [OutputVendorName.JSON]: 'Json',
  };

const accountMetadata: Record<
  CompanyTypes | OutputVendorName,
  AccountMetadata
> = mapValues(accountIdToDisplayName, (displayName, accountId) => {
  return {
    companyId: accountId,
    companyName: displayName,
    logo: icons[accountId],
  };
});

const CARD_SIX_DIGITS_FIELD = 'card6Digits';
const USERCODE_FIELD = 'userCode';
const USERNAME_FIELD = 'username';
const PASSWORD_FIELD = 'password';
const NUM_FIELD = 'num';
const ID_FIELD = 'id';
const NATIONAL_ID_FIELD = 'nationalID';

export const IMPORTERS_LOGIN_FIELDS = {
  [CompanyTypes.HAPOALIM]: [USERCODE_FIELD, PASSWORD_FIELD],
  [CompanyTypes.HAPOALIM_BE_ONLINE]: [USERCODE_FIELD, PASSWORD_FIELD],
  [CompanyTypes.LEUMI]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.MIZRAHI]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.DISCOUNT]: [ID_FIELD, PASSWORD_FIELD, NUM_FIELD],
  [CompanyTypes.OTSAR_HAHAYAL]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.LEUMI_CARD]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.MAX]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.VISACAL]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.ISRACARD]: [ID_FIELD, CARD_SIX_DIGITS_FIELD, PASSWORD_FIELD],
  [CompanyTypes.AMEX]: [ID_FIELD, CARD_SIX_DIGITS_FIELD, PASSWORD_FIELD],
  [CompanyTypes.UNION]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.BEINLEUMI]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.MASSAD]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.YAHAV]: [USERNAME_FIELD, PASSWORD_FIELD, NATIONAL_ID_FIELD],
  [CompanyTypes.BEYAHAD_BISHVILHA]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.BEHATSDAA]: [ID_FIELD, PASSWORD_FIELD],
  [CompanyTypes.MERCANTILE]: [ID_FIELD, PASSWORD_FIELD, NUM_FIELD],
};

export const LOGIN_FIELD_DISPLAY_NAMES = {
  [USERCODE_FIELD]: 'קוד משתמש',
  [PASSWORD_FIELD]: 'סיסמא',
  [USERNAME_FIELD]: 'שם משתמש',
  [ID_FIELD]: 'מספר זהות',
  [NUM_FIELD]: 'קוד מזהה',
  [CARD_SIX_DIGITS_FIELD]: '6 ספרות של הכרטיס',
  [NATIONAL_ID_FIELD]: 'תעודת זהות',
};

export const LOGIN_FIELD_MIN_LENGTH = {
  [USERCODE_FIELD]: 3,
  [PASSWORD_FIELD]: 4,
  [USERNAME_FIELD]: 3,
  [ID_FIELD]: 9,
  [NUM_FIELD]: 4,
  [CARD_SIX_DIGITS_FIELD]: 6,
  [NATIONAL_ID_FIELD]: 9,
};

export const importers: Account[] = Object.values(CompanyTypes).map(
  (importerName) => {
    const { companyId, companyName, logo } = accountMetadata[importerName];

    const importer: Account = {
      id: importerName,
      companyId,
      displayName: companyName,
      logo,
      type: AccountType.IMPORTER,
      active: true,
      logs: [],
    };
    return importer;
  },
);

export const exporterUIHandlers: Record<
  OutputVendorName,
  ExportResultMetadata
> = {
  [OutputVendorName.YNAB]: {
    resultType: ExporterResultType.WEBSITE_URL,
    getResultUri(exporter: YnabConfig): string {
      return `https://app.youneedabudget.com/${
        exporter.options.budgetId
      }`;
    },
  },
  [OutputVendorName.GOOGLE_SHEETS]: {
    resultType: ExporterResultType.WEBSITE_URL,
    getResultUri(exporter: GoogleSheetsConfig): string {
      return `https://docs.google.com/spreadsheets/d/${
        exporter.options.spreadsheetId
      }/edit`;
    },
  },
  [OutputVendorName.CSV]: {
    resultType: ExporterResultType.WEBSITE_URL,
    getResultUri(exporter: CsvConfig): string {
      return exporter.options.filePath;
    },
  },
  [OutputVendorName.JSON]: {
    resultType: ExporterResultType.WEBSITE_URL,
    getResultUri(exporter: JsonConfig): string {
      return exporter.options.filePath;
    },
  },
};

export default accountMetadata;
