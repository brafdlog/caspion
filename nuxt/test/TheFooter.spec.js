import { shallowMount } from '@vue/test-utils';
import TheFooter from '@/components/TheFooter';

const factory = () => shallowMount(TheFooter);

describe('TheFooter', () => {
  it('is a Vue instance', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
