<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Exporters</v-toolbar-title>
    </v-toolbar>
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
import Vue from 'vue';
import JsonExporter from './exporters/JsonExporter.vue';
import YnabExporter from './exporters/YnabExporter.vue';
import ExpansionPanel from './exporters/ExpansionPanel.vue';
import SpreadsheetExporter from './exporters/googleSheets/SpreadsheetExporter.vue';

export default Vue.extend({
  components: {
    ExpansionPanel, JsonExporter, YnabExporter, SpreadsheetExporter
  },
});
</script>

<style scoped>
</style>
