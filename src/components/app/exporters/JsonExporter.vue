<template>
  <v-form
    ref="vForm"
    v-model="validated"
  >
    <v-checkbox
      v-model="exporter.active"
      label="Active"
      @change="changed = true"
    />
    <v-file-input
      v-model="exportFile"
      label="File"
      hint="Select *.json file"
      accept=".json"
      @change="changed = true"
    />
    <v-btn
      color="primary"
      :disabled="!readyToSave.value"
      @click="submit()"
    >
      Save
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { computed, ref, reactive } from '@vue/composition-api';
import store from '@/store';
import { JsonConfig } from '@/originalBudgetTrackingApp/configManager/configManager';
import { VForm } from '@/types/vuetify';
import { filenameToFile } from '@/composite/refs';

export default Vue.extend({
  name: 'JsonExporter',

  setup() {
    const vForm = ref<VForm>();

    const exporter = reactive(JSON.parse(JSON.stringify(store.getters.Config.getExporter('json'))) as JsonConfig);
    const exportFile = filenameToFile(exporter.options.fileName);

    const validated = ref(true);
    const changed = ref(false);
    const readyToSave = computed(() => validated && changed);
    const submit = () => {
      if (vForm.value?.validate()) {
        store.dispatch.Config.addExporter(exporter)
          .then(() => { changed.value = false; });
      }
    };

    return {
      validated, changed, readyToSave, submit, exporter, exportFile, vForm
    };
  }
});
</script>

<style scoped>

</style>
