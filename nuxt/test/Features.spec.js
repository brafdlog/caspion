import { shallowMount } from '@vue/test-utils';
import Features from '@/components/Features';

const factory = () => shallowMount(Features);

describe('Features', () => {
  it('is a Vue instance', () => {
    const wrapper = factory();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
