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
import { setupExporterConfigForm } from '@/components/app/exporters/exportersCommon';
import { OutputVendorName } from '@/originalBudgetTrackingApp/commonTypes';
import { legalPath } from '@/components/shared/formValidations';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
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
