import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import Importers from '../../../src/components/App/Importers.vue';
import AddImporter from '../../../src/components/App/Importers/AddImporter.vue';
import { inputVendors } from '../../../src/originalBudgetTrackingApp';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Importers', () => {
  let wrapper: Wrapper<Vue>;
  let store: Store<unknown>;

  beforeEach(() => {
    store = new Vuex.Store({
      getters: {}
    });
    wrapper = shallowMount(Importers, { store, localVue });
  });

  it('Should contain an AddScraper component for each scraper', () => {
    expect(wrapper.findAllComponents(AddImporter).length).toBe(inputVendors.length);
  });
});
