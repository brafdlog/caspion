<template>
  <el-collapse-item :title="scraper.name" :name="scraper.key">
    <el-form :model="scraperToAdd" ref="addScraperForm">
      <el-form-item v-for="(value, loginField) in scraperToAdd.loginFields"
        :key="loginField"
        :label="loginField">
        <el-input v-model="scraperToAdd.loginFields[loginField]" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="submitForm('addScraperForm')"
          :disabled="!isFormValid">Add</el-button>
      </el-form-item>
    </el-form>
  </el-collapse-item>
</template>

<script>
import { mapActions } from 'vuex'

function scraperToImporter (scraper) {
  const importer = Object.assign({}, scraper, {loginFields: {}})
  scraper.loginFields.forEach(element => {
    importer.loginFields[element] = null
  })
  return importer
}

export default {
  props: ['scraper'],
  data () {
    console.log(scraperToImporter(this.scraper))
    return {
      scraperToAdd: scraperToImporter(this.scraper)
    }
  },
  methods: {
    submitForm (formRef) {
      console.log(this.scraperToAdd)
      if (this.isFormValid) {
        this.addImporterAction(this.scraperToAdd)
        this.resetForm()
      } else {
        console.log('error submit!!')
        return false
      }
    },
    resetForm () {
      Object.assign(this.$data.scraperToAdd, scraperToImporter(this.scraper))
    },
    ...mapActions([
      'addImporterAction'
    ])
  },
  computed: {
    isFormValid () {
      return Object.values(this.scraperToAdd.loginFields)
        .every(key => key && key.trim().length > 0)
    }
  }
}
</script>

<style scoped>
.add-scraper {
    display: flex;
    flex-direction: column
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>