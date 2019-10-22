<template>
  <el-card :body-style="{ padding: '0px' }">
    <el-collapse-item name="1">
    <div slot="title">
      <span>{{ importer.name }}</span>
    </div>
    <div v-for="(value, loginField) in importer.loginFields" :key="loginField">
      {{ loginField }}: {{ value }}
    </div>
    <el-button type="primary"
          @click="scrape()">Import</el-button>
  </el-collapse-item>
  </el-card>
</template>

<script>
import { scrape } from '../../../modules/scrapers'
export default {
  props: ['importer'],
  methods: {
    scrape: async function () {
      console.log(this.importer)
      const result = await scrape(this.importer.importerId, this.importer.loginFields)
      console.log(result)
    }
  }
}
</script>

<style>

</style>