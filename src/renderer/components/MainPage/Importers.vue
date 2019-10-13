<template>
  <div>
    <div class="title">
      <Span>Importers</Span>
      <button v-on:click='isShowOptionalImporters = !isShowOptionalImporters' >Add</button>
    </div>
    <div v-show="isShowOptionalImporters">
    Select you importer
    <add-scraper 
      v-for="scraper in scrapers" 
      :key="scraper.name" 
      :scraper="scraper" />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import AddScraper from './Importers/AddScraper'

  export default {
    data () {
      return {
        isShowOptionalImporters: false
      }
    },
    computed: {
      ...mapState({
        scrapers: state => state.Scrapers.scrapers
      })
    },
    components: { AddScraper }
  }
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
</style>
