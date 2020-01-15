/* eslint-disable no-console */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Importers from 'components/MainPage/Importers';
import baseStore from '../helpers/baseStore';
import ElementUI from 'element-ui';

const localVue = createLocalVue();
localVue.use(ElementUI)
localVue.use(Vuex);

describe('Importers.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(baseStore);
  });

  it('should render correct contents', () => {
    const wrapper = shallowMount(Importers, { store, localVue });

    console.log(wrapper.html());
  });
});
