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
      label="JSON file"
      outlined
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

export default Vue.extend({
  name: 'JsonExporter',

  setup() {
    return {
      ...setupExporterConfigForm(OutputVendorName.JSON)
    };
  }
});
</script>

<style scoped>

</style>
