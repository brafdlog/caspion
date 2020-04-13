const { stringified } = require('./globals.config');

const globals = Object.keys(stringified).reduce((acc, globalName) => {
  acc[globalName] = 'readonly';
  return acc
}, {});

module.exports = {
    root: true,
    settings: {
        'import/resolver': {
          alias: {
            map: [
              ['@', './'],
            ],
            extensions: ['.js', '.vue']
          }
        }
    },

    env: {
      browser: true,
    },

    extends: ['airbnb-base', 'plugin:vue/recommended'],

    plugins: [
      'import',
      'vue',
      'html',
    ],

    globals,

    rules: {
      'no-param-reassign': ['error', { ignorePropertyModificationsFor: ['state'] }],
      'no-shadow': ['error', { allow: ['state'] }],
      'import/extensions': ['error', { js: 'never', vue: 'never', json: 'always' }],
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,
      'linebreak-style': process.platform === 'win32' ? 0 : 2,
      'max-len': 0,
      "import/no-extraneous-dependencies": ["error", {"devDependencies": ["*.config.js", "**/*.spec.js"]}]
    },
}
