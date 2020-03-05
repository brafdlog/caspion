import { shallowMount } from '@vue/test-utils'
import Logo from '@/components/Logo'

const factory = () => {
  return shallowMount(Logo, {
    propsData: {
      isStickable: true,
      isSticky: false
    }
  })
}

describe('Logo', () => {
  it('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has the property isStickable', () => {
    const wrapper = factory()
    expect(wrapper.props('isStickable')).toBe(true)
  })

  it('has the property isSticky', () => {
    const wrapper = factory()
    expect(wrapper.props('isSticky')).toBe(false)
  })

  describe('when creating the classlist', () => {
    describe('when isStickable is true and isSticky is false', () => {
      it('has the class', () => {
        const wrapper = factory()
        const anchor = wrapper.find('a')
        expect(anchor.classes('text-white')).toBe(true)
      })
    })

    describe('when isStickable is true and isSticky is true', () => {
      it('has the class', () => {
        const wrapper = factory()
        wrapper.setProps({ isSticky: true })
        const anchor = wrapper.find('a')
        expect(anchor.classes('text-gray-800')).toBe(true)
      })
    })

    describe('when isStickable is false', () => {
      it('has the class', () => {
        const wrapper = factory()
        wrapper.setProps({ isStickable: false })
        const anchor = wrapper.find('a')
        expect(anchor.classes('text-orange-600')).toBe(true)
      })
    })
  })
})
