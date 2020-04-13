<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        Exporters
      </v-toolbar-title>
    </v-toolbar>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="comp in exportersComponents"
        :key="comp.name"
        :name="comp.name"
      >
        <v-expansion-panel-header disable-icon-rotate>
          {{ comp.title }}
          <template v-slot:actions>
            <v-tooltip
              v-if="statuses[comp.name].lastMessage !== null"
              left
            >
              <template v-slot:activator="{ on }">
                <v-icon
                  :color="iconClass(statuses[comp.name].success).color"
                  dark
                  v-on="on"
                >
                  {{ iconClass(statuses[comp.name].success).icon }}
                </v-icon>
              </template>
              <span>{{ statuses[comp.name].lastMessage }}</span>
            </v-tooltip>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <component
            :is="comp.name"
            :message.sync="statuses[comp.name].lastMessage"
            :success.sync="statuses[comp.name].success"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import JsonExporter from './Exporters/JsonExporter';
import SpreadsheetExporter from './Exporters/SpreadsheetExporter';

const exportersComponents = {
  JsonExporter,
  SpreadsheetExporter,
};

const statuses = {};
Object.keys(exportersComponents).forEach((key) => {
  statuses[key] = {
    lastMessage: null,
    success: null,
  };
});

export default {
  components: { ...exportersComponents },
  data() {
    return {
      accordionActiveItem: '',
      exportersComponents,
      statuses,
    };
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
