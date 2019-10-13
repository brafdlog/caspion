<template>
  <div class="add-scraper">
      <span>{{ scraper.name }}</span>
      <input v-for="field in scraper.loginFields" :key="field"
        type="text"
        :placeholder="field"
        v-model="values[field]" />
      <button v-on:click="add">Add</button>
  </div>
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
button {
    margin-left: auto;
}
</style>