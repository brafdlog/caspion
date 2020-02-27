<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        Importers
      </v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-group
        v-for="importer in importers"
        :key="importer.id"
        color="primary"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="importer.name" />
            <v-tooltip
              v-if="importer.status.lastMessage !== null"
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-icon
                  color="primary"
                  left
                  dark
                  v-on="on"
                >
                  {{ iconClass(importer.status.success) }}
                </v-icon>
              </template>
              <span>{{ importer.status.lastMessage }}</span>
            </v-tooltip>
          </v-list-item-content>
        </template>
        <v-list-item-content>
          <importer
            :key="importer.id"
            :importer="importer"
          />
        </v-list-item-content>
      </v-list-group>
    </v-list>
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
      <add-scraper
        v-for="scraper in scrapers"
        :key="scraper.key"
        :scraper="scraper"
        class="add-scraper"
        @scraperAdded="drawer = !drawer"
      />
      <v-fab-transition>
        <v-btn
          color="error"
          fab
          dark
          small
          absolute
          bottom
          left
          style="margin-bottom: 39px;"
          @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-fab-transition>
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
    setActive(importer, value) {
      this.updateImporterIsActive({ id: importer.id, isActive: !value });
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
