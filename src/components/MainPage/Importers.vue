<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        Importers
      </v-toolbar-title>
    </v-toolbar>
    <el-collapse>
      <el-card
        v-for="importer in importers"
        :key="importer.id"
        :body-style="{ padding: '0px' }"
      >
        <el-collapse-item :name="importer.id">
          <div slot="title">
            <span>{{ importer.name }}</span>
            <el-tooltip
              effect="dark"
              :disabled="importer.status.lastMessage === null"
              :content="importer.status.lastMessage"
              placement="right"
            >
              <i
                class="header-icon"
                :class="iconClass(importer.status.success)"
              />
            </el-tooltip>
          </div>
          <importer
            :key="importer.id"
            :importer="importer"
          />
        </el-collapse-item>
      </el-card>
    </el-collapse>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      data-test="ToggleAddImporter"
    >
      <h3>Add new Importer</h3>
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
import { mapGetters } from 'vuex';
import { scrapers } from '@/modules/scrapers';
import AddScraper from './Importers/AddScraper';
import Importer from './Importers/Importer';

export default {
  components: { AddScraper, Importer },
  data() {
    return {
      active: false,
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
      return {
        'el-icon-question': success === null,
        'el-icon-success': success,
        'el-icon-error': success === false,
      };
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
</style>
