import { shallowMount } from '@vue/test-utils'
import Prices from '@/components/Prices'

const factory = () => {
  return shallowMount(Prices)
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
})
