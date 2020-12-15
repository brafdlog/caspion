<template>
  <v-container class="container d-flex flex-column">
    <v-row
      class="run-button-row"
      align-content="center"
    >
      <v-col align="center">
        <v-btn
          x-large
          :loading="inProgress"
          :color="btnColor"
          @click="scrape"
        >
          Run
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="showAccountCards">
      <v-col cols="12">
        <div>
          <log-viewer :accounts-state="accountsState" />
        </div>
      </v-col>
    </v-row>
    <v-row
      v-else
      align="end"
    >
      <v-col cols="12">
        <div>
          <config-editor />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import LogViewer from '@/components/shared/log/LogViewer.vue';
import {
  computed, defineComponent, reactive, ref
} from '@vue/composition-api';
import { EventEmitter, scrapeAndUpdateOutputVendors } from '@/originalBudgetTrackingApp';
import { AccountsState, handleEvent } from '@/components/app/accountsState';
import store from '@/store';
import ConfigEditor from '@/components/app/ConfigEditor.vue';
import { Levels } from '../shared/log/types';

const statusToColor = {
  NOT_STARTED: null,
  IN_PROGRESS: null,
  SUCCESS: 'green',
  FAILURE: 'red'
};

export default defineComponent({
  components: {
    ConfigEditor,
    LogViewer
  },
  setup() {
    const config = store.getters.Config;
    const scrapingStatus = ref('NOT_STARTED' as keyof typeof statusToColor);
    const inProgress = computed(() => scrapingStatus.value === 'IN_PROGRESS');
    const btnColor = computed(() => statusToColor[scrapingStatus.value]);
    const showAccountCards = computed(() => scrapingStatus.value !== 'NOT_STARTED');

    const accountsState = reactive(new AccountsState(config.getActiveImporters, config.getActiveExporters));

    const eventEmitter = new EventEmitter.BudgetTrackingEventEmitter();

    eventEmitter.onAny((eventName, eventData) => {
      const message = eventData?.message || eventName;
      const logLevel = eventData?.error ? Levels.Error : Levels.Info;
      return handleEvent({ ...eventData, message, level: logLevel }, accountsState);
    });

    const scrape = () => {
      accountsState.clear();
      scrapingStatus.value = 'IN_PROGRESS';
      scrapeAndUpdateOutputVendors(eventEmitter)
        .then(() => scrapingStatus.value = 'SUCCESS')
        .catch(() => scrapingStatus.value = 'FAILURE');
    };

    return {
      inProgress, btnColor, scrape, accountsState, showAccountCards
    };
  },
});
</script>

<style scoped>
.run-button-row {
  flex: 0.5;
}
.container {
  height: 100%;
}
</style>
