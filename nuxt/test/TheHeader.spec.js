import { shallowMount } from '@vue/test-utils'
import TheHeader from '@/components/TheHeader'

const clickEvent = () => {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  })
  document.dispatchEvent(event)
}

const scrollEvent = () => {
  const event = new CustomEvent('scroll')
  document.dispatchEvent(event)
}

const onClickSpy = jest.fn()
const onScrollSpy = jest.fn()

const factory = () => {
  return shallowMount(TheHeader)
}

const spiedFactory = () => {
  return shallowMount(TheHeader, {
    attachToDocument: true,
    methods: { onClick: onClickSpy, onScroll: onScrollSpy }
  })
}

describe('TheHeader', () => {
  it('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders properly', () => {
    const wrapper = factory()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('sets the attribute scrollY to 0', () => {
    const wrapper = factory()
    expect(wrapper.vm.scrollY).toBe(0)
  })

  it('sets the attribute isOpen to false', () => {
    const wrapper = factory()
    expect(wrapper.vm.isOpen).toBe(false)
  })

  describe('when mounted', () => {
    let addEventSpy

    beforeEach(() => {
      addEventSpy = spyOn(document, 'addEventListener')
    })

    it('adds a click event listener', () => {
      const wrapper = factory()
      expect(addEventSpy).toHaveBeenCalledWith('scroll', wrapper.vm.onScroll)
    })

    it('adds a scroll event listener', () => {
      const wrapper = factory()
      expect(addEventSpy).toHaveBeenCalledWith('click', wrapper.vm.onClick)
    })
  })

  describe('when destroyed', () => {
    let wrapper
    let removeEventSpy

    beforeEach(() => {
      wrapper = factory()
      removeEventSpy = spyOn(document, 'removeEventListener')
    })

    it('removes a click event listener', () => {
      wrapper.destroy()
      expect(removeEventSpy).toHaveBeenCalledWith(
        'scroll',
        wrapper.vm.onScroll,
        true
      )
    })

    it('removes a scroll event listener', () => {
      wrapper.destroy()
      expect(removeEventSpy).toHaveBeenCalledWith(
        'click',
        wrapper.vm.onClick,
        true
      )
    })
  })

  describe('when the user clicks on the hamburger menu', () => {
    it('onToggleClick is triggered', () => {
      const wrapper = factory()
      const spy = spyOn(wrapper.vm, 'onToggleClick')
      wrapper.find('button').trigger('click')
      expect(wrapper.vm.onToggleClick).toBeCalled()
    })

    it('sets the property isOpen to true', () => {
      const wrapper = factory()
      expect(wrapper.vm.isOpen).toBe(false)
      wrapper.vm.onToggleClick()
      expect(wrapper.vm.isOpen).toBe(true)
    })

    it('displays the actions', done => {
      const wrapper = factory()
      expect(wrapper.vm.navContentClassList).toEqual(
        expect.stringContaining('hidden')
      )
      wrapper.find('button').trigger('click')
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.navContentClassList).toEqual(
          expect.not.stringContaining('hidden')
        )
        done()
      })
    })
  })

  describe('when the user clicks outside of the burger menu', () => {
    it('onClick is triggered', () => {
      const wrapper = spiedFactory()
      clickEvent()
      expect(onClickSpy).toBeCalled()
    })

    it('sets the property isOpen to false', () => {
      const wrapper = factory()
      wrapper.vm.onClick()
      expect(wrapper.vm.isOpen).toBe(false)
    })

    it('hides the actions', done => {
      const wrapper = factory()
      clickEvent()
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.navContentClassList).toEqual(
          expect.stringContaining('hidden')
        )
        done()
      })
    })
  })

  describe('when the user clicks scrolls on the page', () => {
    it('onScroll is triggered', () => {
      const wrapper = spiedFactory()
      scrollEvent()
      expect(onScrollSpy).toBeCalled()
    })

    it('sets the property isOpen to false', () => {
      const wrapper = factory()
      window.scrollY = 10
      scrollEvent()
      expect(wrapper.vm.scrollY).toBe(10)
    })

    describe('<= 10px scrollY', () => {
      it('does not add the sticky classes to the header', () => {
        const wrapper = factory()
        wrapper.setData({ scrollY: 10 })
        expect(wrapper.vm.headerClassList).toEqual(
          expect.not.stringContaining('bg-white shadow')
        )
      })

      it('does not add the sticky classes to the navActions', () => {
        const wrapper = factory()
        wrapper.setData({ scrollY: 10 })
        expect(wrapper.vm.navActionClassList).toEqual(
          expect.not.stringContaining('gradient text-white')
        )
        expect(wrapper.vm.navActionClassList).toEqual(
          expect.stringContaining('bg-white text-gray-800')
        )
      })

      it('does not add the sticky classes to the navContent', () => {
        const wrapper = factory()
        wrapper.setData({ scrollY: 10 })
        expect(wrapper.vm.navContentClassList).toEqual(
          expect.not.stringContaining('bg-white')
        )
        expect(wrapper.vm.navContentClassList).toEqual(
          expect.stringContaining('bg-gray-100')
        )
      })
    })

    describe('> 10px scrollY', () => {
      it('adds the sticky classes to the header', () => {
        const wrapper = factory()
        wrapper.setData({ scrollY: 11 })
        expect(wrapper.vm.headerClassList).toEqual(
          expect.stringContaining('bg-white shadow')
        )
      })

      it('adds the sticky classes to the navActions', () => {
        const wrapper = factory()
        wrapper.setData({ scrollY: 11 })
        expect(wrapper.vm.navActionClassList).toEqual(
          expect.stringContaining('gradient text-white')
        )
        expect(wrapper.vm.navActionClassList).toEqual(
          expect.not.stringContaining('bg-white text-gray-800')
        )
      })

      it('adds the sticky classes to the navContent', () => {
        const wrapper = factory()
        wrapper.setData({ scrollY: 11 })
        expect(wrapper.vm.navContentClassList).toEqual(
          expect.stringContaining('bg-white')
        )
        expect(wrapper.vm.navContentClassList).toEqual(
          expect.not.stringContaining('bg-gray-100')
        )
      })
    })
  })
})
