import mapValues from 'lodash/mapValues';
import {
  Account, AccountMetadata, AccountType, CompanyTypes, OutputVendorName
} from './types';
import { exporterIcons, importerIcons } from './assets';

const icons = {
  ...importerIcons,
  ...exporterIcons
};

const accountIdToDisplayName: Record<CompanyTypes | OutputVendorName, string> = {
  [CompanyTypes.max]: 'Max',
  [CompanyTypes.amex]: 'אמריקן אקספרס',
  [CompanyTypes.beinleumi]: 'הבינלאומי',
  [CompanyTypes.hapoalimBeOnline]: 'הפועלים בי אונליין',
  [CompanyTypes.isracard]: 'ישראכרט',
  [CompanyTypes.leumiCard]: 'לאומי קארד',
  [CompanyTypes.otsarHahayal]: 'אוצר החייל',
  [CompanyTypes.union]: 'איגוד',
  [CompanyTypes.leumi]: 'לאומי',
  [CompanyTypes.mizrahi]: 'מזרחי',
  [CompanyTypes.hapoalim]: 'הפועלים',
  [CompanyTypes.visaCal]: 'ויזה כאל',
  [CompanyTypes.discount]: 'דיסקונט',
  [CompanyTypes.yahav]: 'יהב',
  [CompanyTypes.beyahadBishvilha]: 'ביחד בשבילך',
  [CompanyTypes.massad]: 'מסד',
  [OutputVendorName.CSV]: 'אקסל',
  [OutputVendorName.GOOGLE_SHEETS]: 'Google Sheets',
  [OutputVendorName.YNAB]: 'Ynab',
  [OutputVendorName.JSON]: 'Json',
};

const accountMetadata: Record<CompanyTypes | OutputVendorName, AccountMetadata> = mapValues(accountIdToDisplayName, (displayName, accountId) => {
  return {
    companyId: accountId,
    companyName: displayName,
    logo: icons[accountId]
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
  [CompanyTypes.hapoalim]: [USERCODE_FIELD, PASSWORD_FIELD],
  [CompanyTypes.hapoalimBeOnline]: [USERCODE_FIELD, PASSWORD_FIELD],
  [CompanyTypes.leumi]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.mizrahi]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.discount]: [ID_FIELD, PASSWORD_FIELD, NUM_FIELD],
  [CompanyTypes.otsarHahayal]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.leumiCard]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.max]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.visaCal]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.isracard]: [ID_FIELD, CARD_SIX_DIGITS_FIELD, PASSWORD_FIELD],
  [CompanyTypes.amex]: [ID_FIELD, CARD_SIX_DIGITS_FIELD, PASSWORD_FIELD],
  [CompanyTypes.union]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.beinleumi]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.massad]: [USERNAME_FIELD, PASSWORD_FIELD],
  [CompanyTypes.yahav]: [USERNAME_FIELD, PASSWORD_FIELD, NATIONAL_ID_FIELD],
  [CompanyTypes.beyahadBishvilha]: [USERNAME_FIELD, PASSWORD_FIELD]
};

export const LOGIN_FIELD_DISPLAY_NAMES = {
  [USERCODE_FIELD]: 'קוד משתמש',
  [PASSWORD_FIELD]: 'סיסמא',
  [USERNAME_FIELD]: 'שם משתמש',
  [ID_FIELD]: 'מספר זהות',
  [NUM_FIELD]: 'קוד מזהה',
  [CARD_SIX_DIGITS_FIELD]: '6 ספרות של הכרטיס',
  [NATIONAL_ID_FIELD]: 'זהות לאומית',
};

export const LOGIN_FIELD_MIN_LENGTH = {
  [USERCODE_FIELD]: 3,
  [PASSWORD_FIELD]: 4,
  [USERNAME_FIELD]: 3,
  [ID_FIELD]: 9,
  [NUM_FIELD]: 4,
  [CARD_SIX_DIGITS_FIELD]: 6,
  [NATIONAL_ID_FIELD]: 5,
};

export const importers: Account[] = Object.values(CompanyTypes).map((importerName) => {
  const { companyId, companyName, logo } = accountMetadata[importerName];

  const importer: Account = {
    id: importerName,
    companyId,
    displayName: companyName,
    logo,
    type: AccountType.IMPORTER,
    active: true,
    logs: []
  };
  return importer;
});

export default accountMetadata;
