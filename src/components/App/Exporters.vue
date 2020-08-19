<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        Exporters
      </v-toolbar-title>
    </v-toolbar>
    <component
      :is="vendor.name"
      v-for="vendor in vendors"
      :key="vendor.name"
      :vendor="vendor"
    />
    <!-- <exporter
      v-for="vendor in vendors"
      :key="vendor.name"
      :vendor="vendor"
    /> -->
  </div>
</template>

<script>
import { outputVendors } from '@/originalBudgetTrackingApp';
import json from './Exporters/JsonExporter';

export default {
  components: { json },
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
