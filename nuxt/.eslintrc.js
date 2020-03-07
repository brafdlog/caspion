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

    rules: {
        'max-len': 0,
    },
}
