<template>
  <v-file-input
    v-model="model"
    :label="$attrs.label"
    :rules="$attrs.rules"
    outlined
  />
</template>

<script>
export default {
  name: 'FileField',
  computed: {
    model: {
      get() { return this.$attrs.value; },
      set(val) { this.$emit('input', val); }
    }
  }
};
</script>

<style>

</style>
