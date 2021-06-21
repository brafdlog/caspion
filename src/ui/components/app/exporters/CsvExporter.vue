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
      @click="selectFolderDialog()"
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
import { OutputVendorName } from '@/backend/commonTypes';
import { legalPath, required } from '@/ui/components/shared/formValidations';
import { defineComponent } from '@vue/composition-api';
import { ipcHandlers } from '@/handlers/';
import { CsvConfig } from '@/backend/configManager/configManager';
import { setupExporterConfigForm } from './exportersCommon';

export default defineComponent({
  name: 'CsvExporter',

  setup() {
    const dataToReturn = setupExporterConfigForm(OutputVendorName.CSV);

    const selectFolderDialog = async () => {
      const filePath = await ipcHandlers.showSaveDialog();
      if (filePath) {
        (dataToReturn.exporter as CsvConfig).options.filePath = filePath;
        dataToReturn.changed.value = true;
      }
    };
    return {
      ...dataToReturn,
      selectFolderDialog,
      rules: [required, legalPath],
    };
  },
});

</script>
<style scoped/>
