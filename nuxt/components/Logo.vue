<template>
  <a
    :class="classList"
    class="no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
    href="#"
  >
    <!--Icon from: http://www.potlabicons.com/ -->
    <img
      class="h-8 fill-current inline"
      src="../../public/favicon.ico"
    >
    &nbsp;עו"שלי
  </a>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    isStickable: {
      type: Boolean,
      default: false,
    },
    isSticky: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classList() {
      let classList = '';
      if (this.isStickable) {
        classList = this.isSticky ? 'text-gray-800' : 'text-white';
      } else {
        classList = 'text-orange-600';
      }
      return classList;
    },
  },
};
</script>
