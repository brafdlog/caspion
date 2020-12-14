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
      <log-viewer :accounts-state="accountsState" />
    </div>
    <div>
      <config-editor />
    </div>
  </div>
</template>

<script lang="ts">
import LogViewer from '@/components/shared/log/LogViewer.vue';
import {
  computed, defineComponent, reactive, ref
} from '@vue/composition-api';
import { BudgetTrackingEvent, scrapeAndUpdateOutputVendors } from '@/originalBudgetTrackingApp';
import { AccountsState, handleEvent } from '@/components/app/AccountsState';
import store from '@/store';
import ConfigEditor from './ConfigEditor.vue';
import { Levels } from '../shared/log/types';
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
    const config = store.getters.Config;
    const scrapingStatus = ref('NOT_STARTED' as keyof typeof statusToColor);
    const inProgress = computed(() => scrapingStatus.value === 'IN_PROGRESS');
    const btnColor = computed(() => statusToColor[scrapingStatus.value]);

    const accountsState = reactive(new AccountsState(config.getActiveImporters, config.getActiveExporters));
    const eventPublisher = LogsEventEmitter((event: BudgetTrackingEvent & { level: Levels }) => handleEvent(event, accountsState));

    const scrape = () => {
      accountsState.clear();
      scrapingStatus.value = 'IN_PROGRESS';
      scrapeAndUpdateOutputVendors(eventPublisher)
        .then(() => scrapingStatus.value = 'SUCCESS')
        .catch(() => scrapingStatus.value = 'FAILURE');
    };

    return {
      inProgress, btnColor, scrape, accountsState
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
