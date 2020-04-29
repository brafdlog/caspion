export const FINANCIAL_COMPANIES = {
  LEUMI: 'leumi',
  VISA_CAL: 'visaCal',
  LEUMI_CARD: 'leumiCard',
  BEINLEUMI: 'beinleumi',
  HAPOALIM: 'hapoalim',
  DISCOUNT: 'discount',
  OTSAR_HAHAYAL: 'otsarHahayal',
  ISRACARD: 'isracard',
  AMERICAN_EXPRESS: 'amex'
};

export const FINANCIAL_COMPANIES_CONFIG = {
  [FINANCIAL_COMPANIES.LEUMI]: {
    logoImageSrc:
      'https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/79/50/3b/79503b03-e956-60a4-f9e8-aaeffc388b06/AppIcon-0-1x_U007emarketing-0-0-85-220-0-4.png/246x0w.jpg',
    displayName: 'לאומי'
  },
  [FINANCIAL_COMPANIES.VISA_CAL]: {
    logoImageSrc: 'https://cdn.freebiesupply.com/logos/large/2x/visa-2-logo-png-transparent.png',
    displayName: 'ויזה כאל'
  },
  [FINANCIAL_COMPANIES.BEINLEUMI]: {
    logoImageSrc:
      'https://is4-ssl.mzstatic.com/image/thumb/Purple113/v4/0e/34/92/0e349207-895b-7ec8-0f16-dc2f959c3185/AppIcon-0-0-1x_U007emarketing-0-0-0-5-0-0-85-220.jpeg/434x0w.jpg',
    displayName: 'הבינלאומי'
  },
  [FINANCIAL_COMPANIES.LEUMI_CARD]: {
    logoImageSrc:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/e6/d3/40/e6d34009-8df4-0755-7b78-236562749bc3/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-3.png/246x0w.jpg',
    displayName: 'לאומי קארד - max'
  },
  [FINANCIAL_COMPANIES.HAPOALIM]: {
    logoImageSrc: 'https://yt3.ggpht.com/a/AGF-l7-v56BwWUBUyi-1YaqthhcMvj1-ks-SFYGIgg=s288-c-k-c0xffffffff-no-rj-mo',
    displayName: 'הפועלים'
  },
  [FINANCIAL_COMPANIES.DISCOUNT]: {
    logoImageSrc: 'https://yt3.ggpht.com/a/AGF-l78kCMr0vvCd49lr6FzD4FN2kM9BF2NbI9hI0A=s900-c-k-c0xffffffff-no-rj-mo',
    displayName: 'דיסקונט'
  },
  [FINANCIAL_COMPANIES.OTSAR_HAHAYAL]: {
    logoImageSrc: 'https://is2-ssl.mzstatic.com/image/thumb/Purple113/v4/65/d4/93/65d49347-7d3a-07ef-c468-cb0122db7f07/source/256x256bb.jpg',
    displayName: 'אוצר החייל'
  },
  [FINANCIAL_COMPANIES.ISRACARD]: {
    logoImageSrc: 'https://static-s.aa-cdn.net/img/ios/489783331/01220130f45da0bd6c11eb81cb1c0862?v=1',
    displayName: 'ישראכרט'
  },
  [FINANCIAL_COMPANIES.AMERICAN_EXPRESS]: {
    logoImageSrc: 'https://d27dymkl0d7xsb.cloudfront.net/images/verifications/logos/american-express-logo-6fcf393b.png',
    displayName: 'אמריקן אקספרס'
  }
};

Object.keys(FINANCIAL_COMPANIES_CONFIG).forEach(companyId => {
  FINANCIAL_COMPANIES_CONFIG[companyId].id = companyId;
});
