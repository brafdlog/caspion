import { OutputVendorName } from '@/originalBudgetTrackingApp/configManager/configManager';
import { CompanyTypes } from '@/originalBudgetTrackingApp';
import americanExpressLogo from './assets/logos/americanExpress.jpeg';
import discountLogo from './assets/logos/discount.jpeg';
import maxLogo from './assets/logos/max.jpeg';
import beinleumiLogo from './assets/logos/beinleumi.jpeg';
import hapoalimBeOnlineLogo from './assets/logos/hapoalimBeOnline.jpeg';
import isracardLogo from './assets/logos/isracard.jpeg';
import leumiLogo from './assets/logos/leumi.png';
import leumiCardLogo from './assets/logos/leumicard.png';
import otsarHahayalLogo from './assets/logos/otsarHahayal.jpeg';
import poalimLogo from './assets/logos/poalim.jpeg';
import igudLogo from './assets/logos/igud.jpeg';
import mizrahiLogo from './assets/logos/mizrahi.png';
import visaCalLogo from './assets/logos/visa-cal.jpeg';
import excelLogo from './assets/logos/excel.png';
import jsonLogo from './assets/logos/json.jpeg';
import googleSheetsLogo from './assets/logos/sheets.png';
import ynabLogo from './assets/logos/ynab.jpeg';

export type AccountMetadata = {
  companyKey: string;
  companyName: string;
  logo: any;
}

type AccountsMetadata = {
  importers: Record<CompanyTypes, AccountMetadata>,
  exporters: Record<OutputVendorName, AccountMetadata>
}

const ACCOUNT_METADATA: AccountsMetadata = {
  importers: {
    [CompanyTypes.max]: {
      companyKey: CompanyTypes.max,
      companyName: 'Max',
      logo: maxLogo
    },
    [CompanyTypes.amex]: {
      companyKey: CompanyTypes.amex,
      companyName: 'American Express',
      logo: americanExpressLogo
    },
    [CompanyTypes.beinleumi]: {
      companyKey: CompanyTypes.beinleumi,
      companyName: 'הבינלאומי',
      logo: beinleumiLogo
    },
    [CompanyTypes.hapoalimBeOnline]: {
      companyKey: CompanyTypes.hapoalimBeOnline,
      companyName: 'הפועלים',
      logo: hapoalimBeOnlineLogo
    },
    [CompanyTypes.isracard]: {
      companyKey: CompanyTypes.isracard,
      companyName: 'ישראכרט',
      logo: isracardLogo
    },
    [CompanyTypes.leumiCard]: {
      companyKey: CompanyTypes.leumiCard,
      companyName: 'לאומי קארד',
      logo: leumiCardLogo
    },
    [CompanyTypes.otsarHahayal]: {
      companyKey: CompanyTypes.otsarHahayal,
      companyName: 'אוצר החייל',
      logo: otsarHahayalLogo
    },
    [CompanyTypes.union]: {
      companyKey: CompanyTypes.union,
      companyName: 'איגוד',
      logo: igudLogo
    },
    [CompanyTypes.leumi]: {
      companyKey: CompanyTypes.leumi,
      companyName: 'לאומי',
      logo: leumiLogo
    },
    [CompanyTypes.mizrahi]: {
      companyKey: CompanyTypes.mizrahi,
      companyName: 'מזרחי',
      logo: mizrahiLogo
    },
    [CompanyTypes.hapoalim]: {
      companyKey: CompanyTypes.hapoalim,
      companyName: 'הפועלים',
      logo: poalimLogo
    },
    [CompanyTypes.visaCal]: {
      companyKey: CompanyTypes.visaCal,
      companyName: 'ויזה כאל',
      logo: visaCalLogo
    },
    [CompanyTypes.discount]: {
      companyKey: CompanyTypes.discount,
      companyName: 'דיסקונט',
      logo: discountLogo
    }
  },
  exporters: {
    [OutputVendorName.CSV]: {
      companyKey: OutputVendorName.CSV,
      companyName: 'Excel (csv)',
      logo: excelLogo
    },
    [OutputVendorName.JSON]: {
      companyKey: OutputVendorName.JSON,
      companyName: 'Json',
      logo: jsonLogo
    },
    [OutputVendorName.GOOGLE_SHEETS]: {
      companyKey: OutputVendorName.GOOGLE_SHEETS,
      companyName: 'Google sheets',
      logo: googleSheetsLogo
    },
    [OutputVendorName.YNAB]: {
      companyKey: OutputVendorName.YNAB,
      companyName: 'Ynab',
      logo: ynabLogo
    }
  }
};

export default ACCOUNT_METADATA;
