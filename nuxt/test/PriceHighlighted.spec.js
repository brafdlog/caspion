import { shallowMount } from '@vue/test-utils'
import PriceHighlighted from '@/components/PriceHighlighted'

const factory = () => {
  return shallowMount(PriceHighlighted, {
    propsData: {
      name: 'Basic',
      list: ['Thing', 'Thing', 'Thing'],
      price: '9,99 €',
      limited: false
    }
  })
}

describe('Prices', () => {
  it('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has the property name', () => {
    const wrapper = factory()
    expect(wrapper.props('name')).toBe('Basic')
  })

  it('has the property list', () => {
    const wrapper = factory()
    expect(wrapper.props('list')).toEqual(['Thing', 'Thing', 'Thing'])
  })

  it('has the property price', () => {
    const wrapper = factory()
    expect(wrapper.props('price')).toBe('9,99 €')
  })

  it('has the property limited', () => {
    const wrapper = factory()
    expect(wrapper.props('limited')).toBe(false)
  })
})
