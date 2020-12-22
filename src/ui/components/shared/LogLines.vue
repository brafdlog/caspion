<template>
  <p class="log-lines">
    {{ entries }}
  </p>
</template>

<script>
export default {
  name: 'LogLines',
  props: {
    entries: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style scoped>
.log-lines {
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-line;
  color: rgba(0, 0, 0, 0.6);
}
</style>
