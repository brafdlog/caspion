import { CompanyTypes } from '@/backend';
import americanExpressLogo from './ui/assets/logos/americanExpress.jpeg';
import beinleumiLogo from './ui/assets/logos/beinleumi.jpeg';
import beyahadLogo from './ui/assets/logos/beyahadLogo.png';
import discountLogo from './ui/assets/logos/discount.jpeg';
import excelLogo from './ui/assets/logos/excel.png';
import hapoalimBeOnlineLogo from './ui/assets/logos/hapoalimBeOnline.jpeg';
import igudLogo from './ui/assets/logos/igud.jpeg';
import isracardLogo from './ui/assets/logos/isracard.jpeg';
import jsonLogo from './ui/assets/logos/json.jpeg';
import leumiLogo from './ui/assets/logos/leumi.png';
import leumiCardLogo from './ui/assets/logos/leumicard.png';
import massadLogo from './ui/assets/logos/massad.png';
import maxLogo from './ui/assets/logos/max.jpeg';
import mizrahiLogo from './ui/assets/logos/mizrahi.png';
import otsarHahayalLogo from './ui/assets/logos/otsarHahayal.jpeg';
import poalimLogo from './ui/assets/logos/poalim.jpeg';
import googleSheetsLogo from './ui/assets/logos/sheets.png';
import visaCalLogo from './ui/assets/logos/visa-cal.jpeg';
import yahavLogo from './ui/assets/logos/yahavLogo.jpg';
import ynabLogo from './ui/assets/logos/ynab.jpeg';
import oneZeroLogo from './ui/assets/logos/oneZero.jpeg';
import { OutputVendorName } from './backend/commonTypes';

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
    },
    [CompanyTypes.massad]: {
      companyKey: CompanyTypes.massad,
      companyName: 'מסד',
      logo: massadLogo
    },
    [CompanyTypes.yahav]: {
      companyKey: CompanyTypes.yahav,
      companyName: 'יהב',
      logo: yahavLogo
    },
    [CompanyTypes.beyahadBishvilha]: {
      companyKey: CompanyTypes.beyahadBishvilha,
      companyName: 'ביחד בשבילך',
      logo: beyahadLogo
    },
    [CompanyTypes.oneZero]: {
      companyKey: CompanyTypes.oneZero,
      companyName: 'ONE ZERO',
      logo: oneZeroLogo
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
