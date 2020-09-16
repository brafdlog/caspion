<template>
  <v-form
    ref="vForm"
    v-model="validated"
  >
    <v-checkbox
      v-model="exporter.active"
      label="Active"
      hide-details="auto"
      @change="changed = true"
    />
    <v-text-field
      v-model="exporter.options.credentialsFilePath"
      label="Credentials file path"
      hint="Path to google service account json file"
      @change="changed = true"
    />
    <v-text-field
      v-model="exporter.options.spreadsheetId"
      label="Spreadsheet id"
      hint="The id of the google spreadsheet"
      @change="changed = true"
    />
    <v-text-field
      v-model="exporter.options.sheetName"
      label="Sheet name"
      hint="The name of the sheet inside the spreadsheet to export to"
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
import { GoogleSheetsConfig } from '@/originalBudgetTrackingApp/configManager/configManager';
import { VForm } from '@/types/vuetify';

export default Vue.extend({
  name: 'GoogleSheetsExporter',

  setup() {
    const vForm = ref<VForm>();

    const exporterName = 'googleSheets';
    const exporter = reactive(JSON.parse(JSON.stringify(store.getters.Config.getExporter(exporterName))) as GoogleSheetsConfig);

    const validated = ref(true);
    const changed = ref(false);
    const readyToSave = computed(() => validated && changed);
    const submit = async () => {
      if (vForm.value?.validate()) {
        await store.dispatch.Config.updateExporter({ name: exporterName, exporter });
        changed.value = false;
      }
    };

    return {
      validated, changed, readyToSave, submit, exporter, vForm
    };
  }
});
</script>

<style scoped>

</style>
