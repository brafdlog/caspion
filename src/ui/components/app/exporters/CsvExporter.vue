<template>
  <v-form
    ref="vForm"
    v-model="validated"
  >
    <v-checkbox
      v-model="exporter.active"
      class="ma-0"
      label="Active"
      @change="changed = true"
    />
    <v-text-field
      v-model="exporter.options.filePath"
      label="CSV file"
      outlined
      :rules="rules"
      readonly
      @click="click()"
    />
    <v-btn
      color="primary"
      :disabled="!readyToSave"
      @click="submit()"
    >
      Save
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { ipcRenderer } from 'electron';
import { OutputVendorName } from '@/backend/commonTypes';
import { legalPath, required } from '@/ui/components/shared/formValidations';
import {
  defineComponent, computed, reactive, ref
} from '@vue/composition-api';
import store from '@/ui/store';
import { VForm } from '@/types/vuetify';

import { cloneDeep } from 'lodash';

function createSetupConfigForm() {
  const vForm = ref<VForm>();

  const exporter = reactive(cloneDeep(store.getters.Config.getExporter(OutputVendorName.CSV)));
  const validated = ref(true);
  const changed = ref(false);
  const readyToSave = computed(() => validated.value && changed.value);

  const submit = async () => {
    if (vForm.value?.validate()) {
      await store.dispatch.Config.updateExporter({ name: OutputVendorName.CSV, exporter });
      changed.value = false;
    }
  };

  const click = async () => {
    const filePath = await ipcRenderer.invoke('choose-dir');
    if (filePath) {
      exporter.options.filePath = filePath;
      changed.value = true;
    }
  };

  return {
    validated, changed, readyToSave, submit, exporter, vForm, click
  };
}

export default defineComponent({
  name: 'CsvExporter',

  setup() {
    return {
      ...createSetupConfigForm(),
      rules: [
        required,
        legalPath
      ]
    };
  },
});

</script>
<style scoped/>
