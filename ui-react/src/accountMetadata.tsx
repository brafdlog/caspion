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

export const IMPORTERS_LOGIN_FIELDS = {
  [CompanyTypes.hapoalim]: ['userCode', 'password'],
  [CompanyTypes.hapoalimBeOnline]: ['userCode', 'password'],
  [CompanyTypes.leumi]: ['username', 'password'],
  [CompanyTypes.mizrahi]: ['username', 'password'],
  [CompanyTypes.discount]: ['id', 'password', 'num'],
  [CompanyTypes.otsarHahayal]: ['username', 'password'],
  [CompanyTypes.leumiCard]: ['username', 'password'],
  [CompanyTypes.max]: ['username', 'password'],
  [CompanyTypes.visaCal]: ['username', 'password'],
  [CompanyTypes.isracard]: ['id', 'card6Digits', 'password'],
  [CompanyTypes.amex]: ['id', 'card6Digits', 'password'],
  [CompanyTypes.union]: ['username', 'password'],
  [CompanyTypes.beinleumi]: ['username', 'password'],
  [CompanyTypes.massad]: ['username', 'password']
};

export const LOGIN_FIELD_DISPLAY_NAMES = {
  'userCode': 'קוד משתמש',
  'password': 'סיסמא',
  username: 'שם משתמש',
  id: 'מספר זהות',
  num: 'קוד מזהה',
  card6Digits: '6 ספרות של הכרטיס',

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
