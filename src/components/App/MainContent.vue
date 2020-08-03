<template>
<v-container>
  <v-row justify="center" align="center">
          <v-btn
        x-large
        :loading="scraping"
        :color="btnColor"
        @click="scrape"
      >
        Run
      </v-btn>
  </v-row>
  <v-row justify="conter" align="center">
      <pre class="text-no-wrap">
      {{ results }}
    </pre>
  </v-row>
</v-container>
</template>

<script>
import { scrapeAndUpdateOutputVendors } from '@/originalBudgetTrackingApp';

const colors = {
  true: 'green',
  false: 'red',
  null: null
};

export default {
  name: 'MainContent',
  data() {
    return {
      scraping: false,
      results: null,
      succeeded: null,
    };
  },
  computed: {
    btnColor() {
      return colors[this.succeeded];
    }
  },
  methods: {
    async scrape() {
      this.scraping = true;
      scrapeAndUpdateOutputVendors()
        .then((results) => {
          this.results = results;
        })
        .catch((error) => {
          this.results = error;
        })
        .finally(() => {
          console.log(this.results);
          this.scraping = false;
        });
    }
  }
};
</script>

<style>
</style>
