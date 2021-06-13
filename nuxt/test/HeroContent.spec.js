import { shallowMount } from '@vue/test-utils';
import HeroContent from '@/components/HeroContent';

const factory = () => shallowMount(HeroContent);

describe('HeroContent', () => {
  it('is a Vue instance', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });
});
