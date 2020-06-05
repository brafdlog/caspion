<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        Importers
      </v-toolbar-title>
    </v-toolbar>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="importer in importers"
        :key="importer.id"
        class="ma-1"
      >
        <v-expansion-panel-header disable-icon-rotate>
          {{ importer.name }}
          <template v-slot:actions>
            <v-tooltip
              v-if="importer.status.lastMessage !== null"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-icon
                  :color="iconClass(importer.status.success).color"
                  dark
                  v-on="on"
                >
                  {{ iconClass(importer.status.success).icon }}
                </v-icon>
              </template>
              <span>{{ importer.status.lastMessage }}</span>
            </v-tooltip>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <importer
            :key="importer.id"
            :importer="importer"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      data-test="ToggleAddImporter"
    >
      <v-toolbar>
        <v-toolbar-title>
          Add new Importer
        </v-toolbar-title>
      </v-toolbar>
      <v-expansion-panels>
        <add-scraper
          v-for="scraper in scrapers"
          :key="scraper.key"
          :scraper="scraper"
          class="add-scraper"
          @scraperAdded="drawer = !drawer"
        />
      </v-expansion-panels>
    </v-navigation-drawer>
    <v-fab-transition>
      <v-btn
        color="primary"
        fab
        dark
        small
        absolute
        bottom
        left
        data-test="CollapseAddImporter"
        style="margin-bottom: 39px;"
        @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { scrapers } from '@/modules/scrapers';
import AddScraper from './Importers/AddScraper';
import Importer from './Importers/Importer';

export default {
  components: { AddScraper, Importer },
  data() {
    return {
      id: null,
      drawer: null,
    };
  },
  computed: {
    scrapers() {
      return scrapers;
    },
    ...mapGetters(['importers']),
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
.v-expansion-panel-content__wrap {
  padding: 5px !important;
}
</style>
