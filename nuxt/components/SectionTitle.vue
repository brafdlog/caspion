<template>
  <div class="w-full">
    <h1
      class="w-full my-2 text-5xl font-bold leading-tight text-center"
      :class="h1"
    >
      <slot />
    </h1>
    <div class="w-full mb-4">
      <div
        class="h-1 mx-auto opacity-25 my-0 py-0 rounded-t"
        :class="line"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: {
    white: {
      type: Boolean,
    },
  },
  computed: {
    h1() {
      return this.white ? 'text-white' : 'text-gray-800';
    },
    line() {
      return this.white ? 'bg-white w-1/6' : 'gradient w-64';
    },
  },
};
</script>
