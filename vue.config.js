const globals = require('./globals');
import {name as appName} from './package.json';

const defineGlobals = (config) => {
  config.plugin('define').tap((args) => {
    args[0] = globals;
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
        'israeli-bank-scrapers-core'
      ],
      builderOptions: {
        productName: appName,
        appId: 'com.electron.' + appName,
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
