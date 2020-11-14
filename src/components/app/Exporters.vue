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
      <google-sheets-exporter />
    </expansion-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import JsonExporter from './exporters/JsonExporter.vue';
import GoogleSheetsExporter from './exporters/GoogleSheetsExporter.vue';
import YnabExporter from './exporters/YnabExporter.vue';
import ExpansionPanel from './exporters/ExpansionPanel.vue';

export default defineComponent({
  components: {
    ExpansionPanel, JsonExporter, GoogleSheetsExporter, YnabExporter
  },
});
</script>

<style scoped>
</style>
