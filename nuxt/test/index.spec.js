import { shallowMount } from '@vue/test-utils';
import index from '@/pages/index';

const factory = () => shallowMount(index);

describe('index', () => {
  it('is a Vue instance', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
