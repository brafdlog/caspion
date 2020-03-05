import { shallowMount } from '@vue/test-utils'
import CallToAction from '@/components/CallToAction'

const factory = () => {
  return shallowMount(CallToAction)
}

describe('CallToAction', () => {
  it('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
