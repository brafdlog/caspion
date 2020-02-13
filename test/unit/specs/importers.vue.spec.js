import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import { SCRAPERS } from 'israeli-bank-scrapers-core';

import fakeStore from '../helpers/baseStore';
import Importers from '../../../src/components/MainPage/Importers';
import AddScraper from '../../../src/components/MainPage/Importers/AddScraper';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(ElementUI);

describe('Importers', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store(fakeStore);
    wrapper = shallowMount(Importers, { store, localVue });
  });

  it('Should contain an AddScraper component for each scraper', () => {
    expect(wrapper.findAll(AddScraper).length).toBe(Object.keys(SCRAPERS).length - 1);
  });
});
