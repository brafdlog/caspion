<template>
  <el-collapse-item :title="scraper.name" :name="scraper.name">
    <el-form :model="values" ref="addScraperForm">
      <el-form-item v-for="field in scraper.loginFields"
        :key="field"
        :label="field"
        :prop="field"
        :rules="[{required: true, trigger: 'blur'}]">
        <el-input v-model="values[field]" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="submitForm('addScraperForm')">Add</el-button>
      </el-form-item>
    </el-form>
  </el-collapse-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['scraper'],
  data () {
    return {
      values: {}
    }
  },
  methods: {
    submitForm (formRef) {
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          this.addImporterAction(this.values)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    ...mapActions([
      'addImporterAction'
    ])
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