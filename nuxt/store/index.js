export const state = () => ({
  locales: ['en', 'de'],
  locale: 'de'
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}
