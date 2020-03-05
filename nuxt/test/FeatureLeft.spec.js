import { shallowMount } from '@vue/test-utils'
import FeatureLeft from '@/components/FeatureLeft'

const factory = () => {
  return shallowMount(FeatureLeft, {
    propsData: {
      headline: 'Lorem Ipsum',
      content: 'Lorem Ipsum dolor sit'
    }
  })
}

describe('FeatureLeft', () => {
  it('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has the property headline', () => {
    const wrapper = factory()
    expect(wrapper.props('headline')).toBe('Lorem Ipsum')
  })

  it('has the property content', () => {
    const wrapper = factory()
    expect(wrapper.props('content')).toBe('Lorem Ipsum dolor sit')
  })
})
