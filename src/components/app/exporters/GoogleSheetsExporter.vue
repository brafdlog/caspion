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
import { OutputVendorName } from '@/originalBudgetTrackingApp/commonTypes';
import { setupExporterConfigForm } from '@/components/app/exporters/exportersCommon';

export default Vue.extend({
  name: 'GoogleSheetsExporter',

  setup() {
    return {
      ...setupExporterConfigForm(OutputVendorName.GOOGLE_SHEETS)
    };
  }
});

</script>

<style scoped>

</style>
