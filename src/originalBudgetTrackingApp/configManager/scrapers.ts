export type LoginFieldName = 'id' | 'username' | 'userCode' | 'password' | 'num' | 'card6Digits';
export type Scraper = {
  name: string;
  loginFields: LoginFieldName[];
};
// eslint-disable-next-line max-len
export type ScraperKey = 'hapoalim'| 'leumi'| 'mizrahi'| 'discount'| 'otsarHahayal'| 'leumiCard'| 'max'| 'visaCal'| 'isracard'| 'amex'| 'union'| 'beinleumi';
export type Scrapers = Record<ScraperKey, Scraper>;

const SCRAPERS: Scrapers = {
  hapoalim: {
    name: 'Bank Hapoalim',
    loginFields: []
  },
  leumi: {
    name: 'Bank Leumi',
    loginFields: ['username', 'password']
  },
  mizrahi: {
    name: 'Mizrahi Bank',
    loginFields: ['username', 'password']
  },
  discount: {
    name: 'Discount Bank',
    loginFields: ['id', 'password', 'num']
  },
  otsarHahayal: {
    name: 'Bank Otsar Hahayal',
    loginFields: ['username', 'password']
  },
  leumiCard: {
    // TODO remove in Major version
    name: 'Leumi Card',
    loginFields: ['username', 'password']
  },
  max: {
    name: 'Max',
    loginFields: ['username', 'password']
  },
  visaCal: {
    name: 'Visa Cal',
    loginFields: ['username', 'password']
  },
  isracard: {
    name: 'Isracard',
    loginFields: ['id', 'card6Digits', 'password']
  },
  amex: {
    name: 'Amex',
    loginFields: ['id', 'card6Digits', 'password']
  },
  union: {
    name: 'Union',
    loginFields: ['username', 'password']
  },
  beinleumi: {
    name: 'Beinleumi',
    loginFields: ['username', 'password']
  }
};

export default SCRAPERS;
