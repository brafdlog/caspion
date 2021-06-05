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
      append-icon="mdi-folder-open"
      @click:append="openNativeDialog"
      @change="changed = true"
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
import { setupExporterConfigForm } from '@/ui/components/app/exporters/exportersCommon';
import { OutputVendorName } from '@/backend/commonTypes';
import { legalPath, required } from '@/ui/components/shared/formValidations';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'CsvExporter',

  setup() {
    return {
      ...setupExporterConfigForm(OutputVendorName.CSV),
      rules: [
        required,
        legalPath
      ]
    };
  },
  data(data) {
    return {
      filePath: data.exporter.options.filePath,
    };
  },
  methods: {
    async openNativeDialog() {
      const filePath = await ipcRenderer.invoke('choose-dir');

      this.filePath = filePath;
      this.$emit('change', filePath);
    }
  }
});

</script>
<style scoped/>
