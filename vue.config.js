const globals = require('./globals');
const appName = require('./package.json').name;

const defineGlobals = (config) => {
  config.plugin('define').tap((args) => {
    args[0] = globals;
    return args;
  });

  config.module
    .rule('binary')
    .test(/\.node$/)
    .use()
    .loader('node-loader');
};

module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
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
