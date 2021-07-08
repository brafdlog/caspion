import { shallowMount } from '@vue/test-utils';
import FeatureLeft from '@/components/FeatureLeft';

const factory = () => shallowMount(FeatureLeft, {
  propsData: {
    headline: 'Lorem Ipsum',
  },
  slots: {
    content: 'Lorem Ipsum dolor sit',
  },
});

describe('FeatureLeft', () => {
  it('is a Vue instance', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });

  it('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('has the property headline', () => {
    const wrapper = factory();
    expect(wrapper.props('headline')).toBe('Lorem Ipsum');
  });

  it('has the property content', () => {
    const wrapper = factory();
    expect(wrapper.text()).toContain('Lorem Ipsum dolor sit');
  });
});
