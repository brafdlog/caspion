import { OutputVendorName } from '@/backend/configManager/configManager';
import { CompanyTypes } from 'israeli-bank-scrapers-core';

type AccountKey = CompanyTypes | OutputVendorName;

export type AccountMetadata = {
  companyKey: string;
  companyName: string;
  logo: string;
}

const PUBLIC_STORAGE_PREFIX = 'https://budget-tracking-public.s3.eu-central-1.amazonaws.com/logos';

const ACCOUNT_METADATA: Record<AccountKey, AccountMetadata> = {
  [CompanyTypes.max]: {
    companyKey: CompanyTypes.max,
    companyName: 'Max',
    logo: buildLogoUrl('max.jpeg',)
  },
  [CompanyTypes.amex]: {
    companyKey: CompanyTypes.amex,
    companyName: 'American Express',
    logo: buildLogoUrl('americanExpress.jpeg')
  },
  [CompanyTypes.beinleumi]: {
    companyKey: CompanyTypes.beinleumi,
    companyName: 'הבינלאומי',
    logo: buildLogoUrl('beimleumi.jpeg')
  },
  [CompanyTypes.hapoalimBeOnline]: {
    companyKey: CompanyTypes.hapoalimBeOnline,
    companyName: 'הפועלים',
    logo: buildLogoUrl('hapoalimBeOnline.jpeg')
  },
  [CompanyTypes.isracard]: {
    companyKey: CompanyTypes.isracard,
    companyName: 'ישראכרט',
    logo: buildLogoUrl('isracard.jpeg')
  },
  [CompanyTypes.leumiCard]: {
    companyKey: CompanyTypes.leumiCard,
    companyName: 'לאומי קארד',
    logo: buildLogoUrl('leumi.png')
  },
  [CompanyTypes.otsarHahayal]: {
    companyKey: CompanyTypes.otsarHahayal,
    companyName: 'אוצר החייל',
    logo: buildLogoUrl('otsarHahayal.jpeg',)
  },
  [CompanyTypes.union]: {
    companyKey: CompanyTypes.union,
    companyName: 'איגוד',
    logo: buildLogoUrl('igud.jpeg')
  },
  [CompanyTypes.leumi]: {
    companyKey: CompanyTypes.leumi,
    companyName: 'לאומי',
    logo: buildLogoUrl('leumi.png')
  },
  [CompanyTypes.mizrahi]: {
    companyKey: CompanyTypes.mizrahi,
    companyName: 'מזרחי',
    logo: buildLogoUrl('mizrahi.jpeg')
  },
  [CompanyTypes.hapoalim]: {
    companyKey: CompanyTypes.hapoalim,
    companyName: 'הפועלים',
    logo: buildLogoUrl('poalim.jpg')
  },
  [CompanyTypes.visaCal]: {
    companyKey: CompanyTypes.visaCal,
    companyName: 'ויזה כאל',
    logo: buildLogoUrl('visa-cal.jpeg')
  },
  [CompanyTypes.discount]: {
    companyKey: CompanyTypes.discount,
    companyName: 'דיסקונט',
    logo: buildLogoUrl('discount.jpeg')
  },
  [OutputVendorName.CSV]: {
    companyKey: OutputVendorName.CSV,
    companyName: 'Excel (csv)',
    logo: buildLogoUrl('excel.png')
  },
  [OutputVendorName.JSON]: {
    companyKey: OutputVendorName.JSON,
    companyName: 'Json',
    logo: buildLogoUrl('json.png')
  },
  [OutputVendorName.GOOGLE_SHEETS]: {
    companyKey: OutputVendorName.GOOGLE_SHEETS,
    companyName: 'Google sheets',
    logo: buildLogoUrl('googleSheets.jpg')
  },
  [OutputVendorName.YNAB]: {
    companyKey: OutputVendorName.YNAB,
    companyName: 'Ynab',
    logo: buildLogoUrl('ynab.jpg')
  }
};

function buildLogoUrl(fileName: string): string {
  return `${PUBLIC_STORAGE_PREFIX}/${fileName}`;
}

export default ACCOUNT_METADATA;
