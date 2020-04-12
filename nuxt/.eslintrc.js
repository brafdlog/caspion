const allGlobals = require('./globals.config');

const globals = Object.keys(allGlobals).reduce((acc, globalName) => {
  acc[globalName] = 'readonly';
  return acc
}, {});

module.exports = {
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
    extends: ['../.eslintrc.js'],

    globals,

    rules: {
        'max-len': 0,
        "import/no-extraneous-dependencies": ["error", {"devDependencies": ["*.config.js", "**/*.spec.js"]}]
    },
}
