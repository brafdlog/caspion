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
            <v-icon>{{ iconClass(importer.status.success) }}</v-icon>
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
      <h3>Add new Importer</h3>
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
import { mapGetters, mapActions } from 'vuex';
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
    ...mapActions(['updateImporterIsActive']),
  },
  methods: {
    iconClass(success) {
      if (success === true) { return 'mdi-check-circle'; }
      if (success === false) { return 'mdi-alert-circle'; }
      return 'mdi-help-circle';
    },
  },
};
</script>

<style scoped>
.items {
  margin-top: 8px;
}

.item {
  display: flex;
  margin-bottom: 6px;
}

.item .name {
  color: #6a6a6a;
  margin-right: 6px;
}

.item .value {
  color: #35495e;
  font-weight: bold;
}

.add-scraper {
  margin: 10px;
}

i.header-icon.el-icon-error {
  color: red;
}

i.header-icon.el-icon-success {
  color: green;
}
.v-icon.v-icon {
  display: inline !important;
}
</style>
