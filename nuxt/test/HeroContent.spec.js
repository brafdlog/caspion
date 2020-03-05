import { shallowMount } from '@vue/test-utils'
import HeroContent from '@/components/HeroContent'

const factory = () => {
  return shallowMount(HeroContent)
}

describe('HeroContent', () => {
  it('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
