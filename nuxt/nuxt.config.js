export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'עוש"י',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'ניהול הוצאות',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/svg'],
  purgeCSS: {
    whitelist: ['hidden'],
    whitelistPatterns: [/md:w-[1-6]/],
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // eslint-disable-next-line no-unused-vars
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.icon?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1kB
          name: 'img/[name].[hash:7].[ext]',
        },
      });
    },
  },
};
