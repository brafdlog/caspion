<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        Exporters
      </v-toolbar-title>
    </v-toolbar>
    <json-exporter
      v-for="vendor in vendors"
      :key="vendor.name"
      :vendor="vendor"
    />
  </div>
</template>

<script>
import { outputVendors } from '@/originalBudgetTrackingApp';
import JsonExporter from './Exporters/JsonExporter';

export default {
  components: { JsonExporter },
  data() {
    return {
      accordionActiveItem: '',
      statuses: {},
    };
  },
  computed: {
    vendors: () => outputVendors,
  },
};
</script>

<style scoped>
</style>
