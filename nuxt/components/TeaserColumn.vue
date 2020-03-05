<template>
  <div :class="classList" class="w-full p-6 flex flex-col flex-grow flex-shrink">
    <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
      <a href="#" class="flex flex-wrap no-underline hover:no-underline">
        <p class="w-full text-gray-600 text-xs md:text-sm px-6">
          <slot name="overline" />
        </p>
        <div class="w-full font-bold text-xl text-gray-800 px-6">
          <slot name="headline" />
        </div>
        <p class="text-gray-800 text-base px-6 mb-5">
          <slot name="content" />
        </p>
      </a>
    </div>
    <div
      v-if="renderAction"
      class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6"
    >
      <div class="flex items-center justify-end">
        <button
          class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
          @click.prevent="onClick"
        >{{ action }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeaserColumn',
  props: {
    rows: {
      type: Number,
      required: true,
      validator: value => {
        return value >= 1 && value <= 6
      }
    },
    action: {
      type: String,
      default: ''
    }
  },
  computed: {
    classList() {
      return `md:w-1/${this.rows}`
    },
    renderAction() {
      return this.action !== ''
    }
  },
  methods: {
    onClick() {
      // NOTE: is fired, but not handled in this template
      this.$emit('clicked')
    }
  }
}
</script>
