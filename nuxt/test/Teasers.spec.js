import { shallowMount } from '@vue/test-utils'
import Teasers from '@/components/Teasers'

const factory = () => {
  return shallowMount(Teasers)
}

describe('Teasers', () => {
  it('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
