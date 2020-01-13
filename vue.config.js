module.exports = {
  pluginOptions: {
    electronBuilder: {
      // List native deps here if they don't work
      externals: ['keytar']
    },
    mainProcessWatch: ['src/service/encryption/crypto.js'],
  }
}