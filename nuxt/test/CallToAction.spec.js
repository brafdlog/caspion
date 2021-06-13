import { shallowMount } from '@vue/test-utils';
import CallToAction from '@/components/CallToAction';

const factory = () => shallowMount(CallToAction);

describe('CallToAction', () => {
  it('is a Vue instance', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
