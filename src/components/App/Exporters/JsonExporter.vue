<template>
  <v-form
    ref="form"
    v-model="validated"
  >
    <v-btn
      color="primary"
      :disabled="!readyToSave"
      @click="submitForm()"
    >
      Save
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { computed, ref } from '@vue/composition-api';

export default Vue.extend({
  name: 'JsonExporter',
  
  setup(_, { root }) {
    const validated = ref(true)
    const changed = ref(false)
    const readyToSave = computed(() => validated && changed)
  }
});
</script>

<style scoped>

</style>
