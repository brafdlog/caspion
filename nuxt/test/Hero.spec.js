import { shallowMount } from '@vue/test-utils'
import Hero from '@/components/Hero'

const factory = () => {
  return shallowMount(Hero)
}

describe('Hero', () => {
  it('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
