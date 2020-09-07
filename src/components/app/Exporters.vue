<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        Exporters
      </v-toolbar-title>
    </v-toolbar>
    <exporter
      v-for="vendor in vendors"
      :key="vendor.name"
      :vendor="vendor"
    />
  </div>
</template>

<script>
import { outputVendors } from '@/originalBudgetTrackingApp';
import Exporter from './exporters/Exporter';

export default {
  components: { Exporter },
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
