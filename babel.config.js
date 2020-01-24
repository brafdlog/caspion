module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ['@babel/env', {
      modules: false,
      useBuiltIns: 'entry',
    }],
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
};
