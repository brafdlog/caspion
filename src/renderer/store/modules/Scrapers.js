import { SCRAPERS } from 'israeli-bank-scrapers-core'

const state = {
  scrapers: Object.keys(SCRAPERS).map(key => {
    return {scraperId: key, ...SCRAPERS[key]}
  })
}

export default {
  state
}
