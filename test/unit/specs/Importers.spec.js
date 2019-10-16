import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Importers from '@/components/MainPage/Importers'
import Scrapers from '../../../src/renderer/store/modules/Scrapers'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Importers.vue', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        Scrapers: {
          state: Scrapers.state
        }
      }
    })
  })

  it('should render correct contents', () => {
    const wrapper = shallowMount(Importers, {store, localVue})

    console.log(wrapper.html())
  })
})
