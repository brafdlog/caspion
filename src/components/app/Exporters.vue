<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Exporters</v-toolbar-title>
    </v-toolbar>
    <expansion-panel title="Json">
      <json-exporter />
    </expansion-panel>
    <expansion-panel title="Google Sheets">
      <google-sheets-exporter />
    </expansion-panel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import JsonExporter from './exporters/JsonExporter.vue';
import GoogleSheetsExporter from './exporters/GoogleSheetsExporter.vue';
import ExpansionPanel from './exporters/ExpansionPanel.vue';

export default Vue.extend({
  components: { ExpansionPanel, JsonExporter, GoogleSheetsExporter },
});
</script>

<style scoped>
</style>
