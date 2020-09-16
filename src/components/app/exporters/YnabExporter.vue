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
      v-model="exporter.options.accessToken"
      type="password"
      label="Access Token"
      outlined
    />
    <v-text-field
      v-model="exporter.options.budgetId"
      label="Budget id"
      outlined
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
  name: 'YnabExporter',

  setup() {
    return {
      ...setupExporterConfigForm(OutputVendorName.YNAB)
    };
  }
});
</script>

<style scoped>

</style>
