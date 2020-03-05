<template>
  <a
    :class="classList"
    class="no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
    href="#"
  >
    <!--Icon from: http://www.potlabicons.com/ -->
    <svg
      class="h-8 fill-current inline"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.005 512.005"
    >
      <rect
        fill="rgb(0,0,0)"
        x="16.539"
        y="425.626"
        width="479.767"
        height="50.502"
        transform="matrix(1,0,0,1,0,0)"
      />
      <path
        class="plane-take-off"
        d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z "
      />
    </svg>&nbsp;LANDING
  </a>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    isStickable: {
      type: Boolean,
      default: false
    },
    isSticky: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList() {
      let classList = ''
      if (this.isStickable) {
        classList = this.isSticky ? 'text-gray-800' : 'text-white'
      } else {
        classList = 'text-orange-600'
      }
      return classList
    }
  }
}
</script>