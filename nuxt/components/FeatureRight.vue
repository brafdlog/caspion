<template>
  <div class="flex flex-wrap">
    <div class="w-5/6 sm:w-1/2 p-6">
      <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">{{ headline }}</h3>
      <p class="text-gray-600 mb-8">
        {{ content }}
        <br />
        <br />Images from:
        <a class="text-orange-500 underline" href="https://undraw.co/">undraw.co</a>
      </p>
    </div>
    <div class="w-full sm:w-1/2 p-6">
      <slot name="svg" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeatureRight',
  props: {
    headline: {
      type: String,
      required: false
    },
    content: {
      type: String,
      required: false
    }
  }
}
</script>
