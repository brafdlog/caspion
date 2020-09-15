const globals = require('./globals');

const defineGlobals = (config) => {
  config.plugin('define').tap((args) => {
    const defined = globals.reduce((prev, curr) => {
      prev[curr] = JSON.stringify(process.env[curr]);
      return prev;
    }, {});
    args[0] = defined;
    return args;
  });
  config.module
    .rule('babel')
    .test(/base-scraper\.js$/)
    .use('babel')
    .loader('babel-loader')
    .options({
      presets: [['@babel/preset-env', { modules: false }]],
      plugins: ['@babel/plugin-proposal-class-properties']
    });
};

module.exports = {
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: defineGlobals,
      chainWebpackRendererProcess: defineGlobals,
      // List native deps here if they don't work
      externals: [
        'keytar',
        'israeli-bank-scrapers-core',
        '@brafdlog/israeli-bank-scrapers-core'
      ],
      builderOptions: {
        productName: 'budget-tracking',
        appId: 'com.electron.budget-tracking',
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications',
            },
            {
              x: 130,
              y: 150,
              type: 'file',
            },
          ],
        },
        mac: {
          icon: 'build/icons/icon.icns',
        },
        win: {
          icon: 'build/icons/icon.ico',
        },
        linux: {
          target: [
            'AppImage',
            'snap',
            'deb',
          ],
          icon: 'build/icons',
        },
      },
    },
    mainProcessWatch: [
      'src/service',
    ],
  },
  transpileDependencies: [
    'vuetify',
  ],
};
