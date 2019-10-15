<template>
  <el-card shadow="hover">
    <div slot="header" class="card-header">
      <div>{{ scraper.name }}</div>
      <el-button class="add-btn" type="text">Add</el-button>
    </div>
    <input v-for="field in scraper.loginFields" :key="field"
      type="text"
      :placeholder="field"
      v-model="values[field]" />
  </el-card>
</template>

<script>
export default {
  props: ['scraper'],
  data () {
    return {
      values: {}
    }
  },
  created () {
    console.log(this.scraper)
  },
  methods: {
    add: function (event) {
      console.log(event.target)
      console.log(this.values)
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