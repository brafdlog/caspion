<template>
  <div class="container">
    <div class="d-flex justify-center align-center">
      <v-btn
        x-large
        :loading="inProgress"
        :color="btnColor"
        @click="scrape"
      >
        Run
      </v-btn>
    </div>
    <div class="keep-bottom">
      <log-viewer :entries="entries" />
    </div>
    <div>
      <config-editor />
    </div>
  </div>
</template>

<script lang="ts">
import LogViewer from '@/components/shared/log/LogViewer.vue';
import { ref, computed, defineComponent } from '@vue/composition-api';
import { scrapeAndUpdateOutputVendors } from '@/originalBudgetTrackingApp';
import ConfigEditor from './ConfigEditor.vue';
import { LogEntry } from '../shared/log/types';
import LogsEventEmitter from './LogsEventEmitter';

const statusToColor = {
  NOT_STARTED: null,
  IN_PROGRESS: null,
  SUCCESS: 'green',
  FAILURE: 'red'
};

export default defineComponent({
  components: {
    LogViewer, ConfigEditor
  },
  setup() {
    const scrapingStatus = ref('NOT_STARTED' as keyof typeof statusToColor);
    const inProgress = computed(() => scrapingStatus.value === 'IN_PROGRESS');
    const btnColor = computed(() => statusToColor[scrapingStatus.value]);
    const entries = ref([] as LogEntry[]);

    const eventPublisher = LogsEventEmitter((entry) => entries.value.push(entry));

    const scrape = () => {
      scrapingStatus.value = 'IN_PROGRESS';
      scrapeAndUpdateOutputVendors(eventPublisher)
        .then(() => scrapingStatus.value = 'SUCCESS')
        .catch(() => scrapingStatus.value = 'FAILURE');
    };

    return {
      inProgress, btnColor, scrape, entries
    };
  },
});
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
  overflow: auto;
}

.container > .keep-bottom {
  display: flex;
  flex-direction: column-reverse;
}

</style>
