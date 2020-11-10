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
    <v-text-field
      v-model="exporter.options.filePath"
      label="CSV file"
      outlined
      :rules="[rules.legalPath]"
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
import { setupExporterConfigForm } from '@/components/app/exporters/exportersCommon';
import { OutputVendorName } from '@/originalBudgetTrackingApp/commonTypes';
import { legalPath } from '@/components/shared/formValidations';

export default Vue.extend({
  name: 'CsvExporter',

  setup() {
    return {
      ...setupExporterConfigForm(OutputVendorName.CSV),
      rules: {
        legalPath
      }
    };
  }
});

</script>
<style scoped/>
