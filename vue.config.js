module.exports = {
  pluginOptions: {
    electronBuilder: {
      // List native deps here if they don't work
      externals: ['keytar'],
      builderOptions: {
        productName: 'israeli-bank-scrapers-desktop',
        appId: 'com..electron.israeli-bank-scrapers-desktop',
        files: [
          'dist/electron/**/*',
        ],
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
    mainProcessWatch: ['src/service'],
  },
};
