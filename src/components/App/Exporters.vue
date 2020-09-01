<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Exporters</v-toolbar-title>
    </v-toolbar>
    <expansion-panel title="Json">
      <json-exporter />
    </expansion-panel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import JsonExporter from './Exporters/JsonExporter.vue';
import ExpansionPanel from './Exporters/ExpansionPanel.vue';

export default Vue.extend({
  components: { ExpansionPanel, JsonExporter },
});
</script>

<style scoped>
</style>
