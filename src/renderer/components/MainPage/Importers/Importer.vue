<template>
  <el-card :body-style="{ padding: '0px' }">
    <el-collapse-item :name="importer._id">
    <div slot="title">
      <span>{{ importer.name }}</span>
      <el-tooltip effect="dark" :disabled="lastMessage === null" :content="lastMessage" placement="right">
        <i class="header-icon" :class="iconClass"></i>
      </el-tooltip>
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
  data () {
    return {
      importing: false,
      success: null,
      lastMessage: null
    }
  },
  computed: {
    iconClass: function () {
      return {
        'el-icon-question': this.success === null,
        'el-icon-success': this.success,
        'el-icon-error': this.success === false
      }
    }
  },
  methods: {
    scrape: async function () {
      console.log(this.importer)
      this.importing = true
      try {
        const result = await scrape(this.importer.key, this.importer.loginFields)
        console.log(result)
        this.updateStatus(result.success, result.errorMessage)
      } catch (error) {
        console.log(error)
        this.updateStatus(false, error.message)
      }
      this.importing = false
    },
    updateStatus: function (success, errorMessage) {
      this.success = success
      if (success === false) {
        this.lastMessage = errorMessage
      }
    }
  }
}
</script>

<style scoped>
i.header-icon.el-icon-error {
  color: red;
}

i.header-icon.el-icon-success {
  color: green;
}
</style>