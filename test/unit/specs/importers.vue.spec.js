import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import fakeStore from '../helpers/baseStore';
import Importers from '../../../src/components/MainPage/Importers';
import AddImporter from '../../../src/components/MainPage/Importers/AddImporter';
import scrapers from '../../../src/modules/importers';

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
    expect(wrapper.findAll(AddImporter).length).toBe(scrapers.length);
  });
});
