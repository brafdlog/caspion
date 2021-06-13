import { shallowMount } from '@vue/test-utils';
import Prices from '@/components/Prices';

const factory = () => shallowMount(Prices);

describe('Prices', () => {
  it('is a Vue instance', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
