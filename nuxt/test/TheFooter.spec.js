import { shallowMount } from '@vue/test-utils'
import TheFooter from '@/components/TheFooter'

const factory = () => {
  return shallowMount(TheFooter)
}

describe('TheFooter', () => {
  it('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
