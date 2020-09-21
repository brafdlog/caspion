<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Exporters</v-toolbar-title>
    </v-toolbar>
    <div class="exporterWrapper">
      <expansion-panel
        title="Json"
        :logo-image="LOGO_IMAGES.json"
      >
        <json-exporter />
      </expansion-panel>
    </div>
    <div class="exporterWrapper">
      <expansion-panel
        title="Ynab"
        :logo-image="LOGO_IMAGES.ynab"
      >
        <ynab-exporter />
      </expansion-panel>
    </div>
    <div class="exporterWrapper">
      <expansion-panel
        title="Google Sheets"
        :logo-image="LOGO_IMAGES.googleSheets"
      >
        <google-sheets-exporter />
      </expansion-panel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { OutputVendorName } from '@/originalBudgetTrackingApp/configManager/configManager';
import JsonExporter from './exporters/JsonExporter.vue';
import GoogleSheetsExporter from './exporters/GoogleSheetsExporter.vue';
import YnabExporter from './exporters/YnabExporter.vue';
import ExpansionPanel from './exporters/ExpansionPanel.vue';

const LOGO_IMAGES : Record<OutputVendorName, string> = {
  googleSheets: 'googleSheets.jpg',
  json: 'json.png',
  ynab: 'ynab.jpg'
};

export default Vue.extend({
  components: {
    ExpansionPanel, JsonExporter, GoogleSheetsExporter, YnabExporter
  },
  data() {
    return {
      LOGO_IMAGES
    };
  }
});
</script>

<style scoped>
  .exporterWrapper {
    margin: 30px 0;
  }
</style>
