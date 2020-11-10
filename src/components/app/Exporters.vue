<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Exporters</v-toolbar-title>
    </v-toolbar>
    <expansion-panel title="Csv">
      <csv-exporter />
    </expansion-panel>
    <expansion-panel title="Json">
      <json-exporter />
    </expansion-panel>
    <expansion-panel title="Ynab">
      <ynab-exporter />
    </expansion-panel>
    <expansion-panel title="Google Sheets">
      <spreadsheet-exporter />
    </expansion-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import CsvExporter from './exporters/CsvExporter.vue';
import JsonExporter from './exporters/JsonExporter.vue';
import YnabExporter from './exporters/YnabExporter.vue';
import ExpansionPanel from './exporters/ExpansionPanel.vue';
import SpreadsheetExporter from './exporters/googleSheets/SpreadsheetExporter.vue';

export default defineComponent({
  components: {
    ExpansionPanel, CsvExporter, JsonExporter, YnabExporter, SpreadsheetExporter
  },
});
</script>

<style scoped>
</style>
