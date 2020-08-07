import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import fakeStore from '../helpers/baseStore';
import Importers from '../../../src/components/App/Importers';
import AddImporter from '../../../src/components/App/Importers/AddImporter';
import { inputVendors } from '../../../src/originalBudgetTrackingApp';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Importers', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store(fakeStore);
    wrapper = shallowMount(Importers, { store, localVue });
  });

  it('Should contain an AddScraper component for each scraper', () => {
    expect(wrapper.findAllComponents(AddImporter).length).toBe(inputVendors.length);
  });
});
