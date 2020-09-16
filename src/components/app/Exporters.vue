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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import JsonExporter from './exporters/JsonExporter.vue';
import YnabExporter from './exporters/YnabExporter.vue';
import ExpansionPanel from './exporters/ExpansionPanel.vue';

export default Vue.extend({
  components: { ExpansionPanel, JsonExporter, YnabExporter },
});
</script>

<style scoped>
</style>
