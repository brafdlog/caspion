import { AccountMetadata, CompanyTypes, OutputVendorName } from './types';
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

export default accountMetadata;
