<template>
  <div>
    <div class="title">
      <Span>Importers</Span>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item
        title="Add new Importer"
        name="1"
      >
        <el-collapse
          v-model="activeName"
          accordion
        >
          <add-scraper
            v-for="scraper in scrapersWithId"
            :key="scraper.name"
            :scraper="scraper"
            class="add-scraper"
          />
        </el-collapse>
      </el-collapse-item>
    </el-collapse>
    <el-collapse>
      <importer
        v-for="importer in importers"
        :key="importer.key"
        :importer="importer"
      />
    </el-collapse>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import AddScraper from './Importers/AddScraper';
import Importer from './Importers/Importer';

export default {
  components: { AddScraper, Importer },
  data() {
    return {
      activeNames: [],
      activeName: '',
    };
  },
  computed: {
    ...mapState({
      scrapers: (state) => state.Scrapers.scrapers,
      importers: (state) => state.Importers.importers,
    }),
    ...mapGetters([
      'scrapersWithId',
    ]),
  },
};
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .items { margin-top: 8px; }

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
</style>
