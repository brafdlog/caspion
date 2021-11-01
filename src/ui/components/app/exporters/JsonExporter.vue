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
      label="JSON file"
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
import { defineComponent } from '@vue/composition-api';
import { setupExporterConfigForm } from '@/ui/components/app/exporters/exportersCommon';
import { OutputVendorName } from '@/backend/commonTypes';
import { legalPath, required } from '@/ui/components/shared/formValidations';
import { ipcHandlers } from '@/handlers/';
import { CsvConfig } from '@/backend/configManager/configManager';

export default defineComponent({
  setup() {
    const dataToReturn = setupExporterConfigForm(OutputVendorName.JSON);

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
      rules: [
        required,
        legalPath
      ]
    };
  }
});
</script>

<style scoped>

</style>
