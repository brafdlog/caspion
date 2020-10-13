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
import Vue from 'vue';
import { ref, computed } from '@vue/composition-api';
import { scrapeAndUpdateOutputVendors } from '@/originalBudgetTrackingApp';
import ConfigEditor from './ConfigEditor.vue';
import { LogEntry } from '../shared/log/types';
import LogsEventEmitter from './LogsEventEmitter';

const colors = {
  success: 'green',
  failed: 'red',
  unknown: null
};

export default Vue.extend({
  components: {
    LogViewer, ConfigEditor
  },
  setup() {
    const inProgress = ref(false);
    const succeeded = ref('unknown' as keyof typeof colors);
    const btnColor = computed(() => colors[succeeded.value]);
    const entries = ref([] as LogEntry[]);

    const eventPublisher = LogsEventEmitter((entry) => entries.value.push(entry));

    const scrape = () => {
      inProgress.value = true;
      succeeded.value = 'unknown';
      scrapeAndUpdateOutputVendors(eventPublisher)
        .then(() => succeeded.value = 'success')
        .catch(() => succeeded.value = 'failed')
        .finally(() => { inProgress.value = false; });
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
