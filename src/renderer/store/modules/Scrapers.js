import { SCRAPERS } from 'israeli-bank-scrapers-core'

const state = {
  scrapers: SCRAPERS
}

const getters = {
  scrapersWithId: state => {
    return Object.keys(state.scrapers).map(k => {
      return {key: k, ...state.scrapers[k]}
    })
  }
}

export default {
  state,
  getters
}
