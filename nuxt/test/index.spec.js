import { shallowMount } from '@vue/test-utils'
import index from '@/pages/index'

const factory = () => {
  return shallowMount(index)
}

describe('index', () => {
  it('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
