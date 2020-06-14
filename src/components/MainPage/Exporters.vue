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
import { outputVendors } from '@/originalBudgetTrackingApp/node';
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
  methods: {
    iconClass(success) {
      if (success === true) {
        return {
          icon: 'mdi-check-circle',
          color: 'green',
        };
      }
      if (success === false) {
        return {
          icon: 'mdi-alert-circle',
          color: 'error',
        };
      }
      return {
        icon: 'mdi-help-circle',
        color: 'info',
      };
    },
  },
};
</script>

<style scoped>
</style>
