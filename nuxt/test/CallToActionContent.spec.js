import { shallowMount } from '@vue/test-utils'
import CallToActionContent from '@/components/CallToActionContent'

const factory = () => {
  return shallowMount(CallToActionContent)
}

describe('CallToActionContent', () => {
  it('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
