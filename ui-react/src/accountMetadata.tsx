import {Account, AccountMetadata, AccountType, CompanyTypes, OutputVendorName} from './types';
import { exporterIcons, importerIcons } from './assets';
import mapValues from 'lodash/mapValues';

const icons = {
  ...importerIcons,
  ...exporterIcons
};

const accountIdToDisplayName: Record<CompanyTypes | OutputVendorName, string> ={
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

const PASSWORD_FIELD = 'password';

export const IMPORTERS_LOGIN_FIELDS = {
  [CompanyTypes.hapoalim]: ['userCode', PASSWORD_FIELD],
  [CompanyTypes.hapoalimBeOnline]: ['userCode', PASSWORD_FIELD],
  [CompanyTypes.leumi]: ['username', PASSWORD_FIELD],
  [CompanyTypes.mizrahi]: ['username', PASSWORD_FIELD],
  [CompanyTypes.discount]: ['id', PASSWORD_FIELD, 'num'],
  [CompanyTypes.otsarHahayal]: ['username', PASSWORD_FIELD],
  [CompanyTypes.leumiCard]: ['username', PASSWORD_FIELD],
  [CompanyTypes.max]: ['username', PASSWORD_FIELD],
  [CompanyTypes.visaCal]: ['username', PASSWORD_FIELD],
  [CompanyTypes.isracard]: ['id', 'card6Digits', PASSWORD_FIELD],
  [CompanyTypes.amex]: ['id', 'card6Digits', PASSWORD_FIELD],
  [CompanyTypes.union]: ['username', PASSWORD_FIELD],
  [CompanyTypes.beinleumi]: ['username', PASSWORD_FIELD],
  [CompanyTypes.massad]: ['username', PASSWORD_FIELD]
};

export const LOGIN_FIELD_DISPLAY_NAMES = {
  'userCode': 'קוד משתמש',
  [PASSWORD_FIELD]: 'סיסמא',
  username: 'שם משתמש',
  id: 'מספר זהות',
  num: 'קוד מזהה',
  card6Digits: '6 ספרות של הכרטיס',

};

export const LOGIN_FIELD_MIN_LENGTH = {
  'userCode': 3,
  'password': 4,
  username: 3,
  id: 9,
  num: 4,
  card6Digits: 6,

};

export const importers: Account[] = [];

for (const importerName in CompanyTypes) {
  const metadata = accountMetadata[importerName];
  const importer : Account = {
    id: importerName,
    companyId: metadata.companyId,
    displayName: metadata.companyName,
    logo: metadata.logo,
    type: AccountType.IMPORTER,
    active: true,
    logs: []
  };

  importers.push(importer);
}

export default accountMetadata;
