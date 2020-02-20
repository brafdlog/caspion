<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        Importers
      </v-toolbar-title>
    </v-toolbar>
    <v-card
      class="mx-auto"
      width="300"
    >
      <v-list class="pa-0 my-0">
        <v-list-group
          v-model="activeNames"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>Add new Importer</v-list-item-title>
          </template>
          <add-scraper
            v-for="scraper in scrapers"
            :key="scraper.key"
            :scraper="scraper"
            class="add-scraper"
          />
        </v-list-group>
      </v-list>
    </v-card>
    <!-- <el-collapse v-model="activeNames">
      <el-collapse-item
        title="Add new Importer"
        name="1"
        data-test="CollapseAddImporter"
      >
        <el-collapse
          v-model="activeKey"
          accordion
        >
          <add-scraper
            v-for="scraper in scrapers"
            :key="scraper.key"
            :scraper="scraper"
            class="add-scraper"
          />
        </el-collapse>
      </el-collapse-item>
    </el-collapse> -->
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
      activeNames: [],
      activeKey: '',
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
