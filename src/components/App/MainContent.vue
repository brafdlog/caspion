<template>
  <div class="container">
    <div class="d-flex justify-center align-center">
      <v-btn
        x-large
        :loading="scraping"
        :color="btnColor"
        @click="scrape"
      >
        Run
      </v-btn>
    </div>
    <div>
      <log-lines :entries="results" />
    </div>
  </div>
</template>

<script>
import { scrapeAndUpdateOutputVendors } from '@/originalBudgetTrackingApp';
import LogLines from '@/components/shared/LogLines';

const colors = {
  true: 'green',
  false: 'red',
  null: null
};

export default {
  name: 'MainContent',
  components: {
    LogLines
  },
  data() {
    return {
      scraping: false,
      results: '',
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
          this.succeeded = true;
        })
        .catch((error) => {
          this.results = error.message;
          this.succeeded = false;
        })
        .finally(() => {
          this.scraping = false;
        });
    }
  }
};
</script>

<style scoped>

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
}

.container > div {
  flex: 1 1 0;
}

</style>
