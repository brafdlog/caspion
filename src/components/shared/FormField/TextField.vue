<template>
  <v-text-field
    v-model="model"
    :label="$attrs.label"
    :rules="$attrs.rules"
    outlined
  />
</template>

<script>
export default {
  name: 'TextField',
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
