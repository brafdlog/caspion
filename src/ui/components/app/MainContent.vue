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
          :disabled="!enableRun"
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
    <v-dialog
      :value="generalError"
      width="500"
    >
      <v-card>
        <v-card-title class="headline red lighten-2">
          Error
        </v-card-title>
        <v-card-text class="general-error-text subtitle-1">
          {{ generalError }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import LogViewer from '@/ui/components/shared/log/LogViewer.vue';
import {
  computed, defineComponent, ref, Ref, UnwrapRef
} from '@vue/composition-api';
import { scrapeAndUpdateOutputVendors, BudgetTrackingEventEmitter } from '@/backend';
import { AccountsState, handleEvent } from '@/ui/components/app/accountsState';
import store from '@/ui/store';
import ConfigEditor from '@/ui/components/app/ConfigEditor.vue';
import { initAnalyticsEventHandling } from '@/logging/analytics';
import logger, { Levels } from '@/logging/logger';

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
    const generalError = ref<string>('');
    const inProgress = computed(() => scrapingStatus.value === 'IN_PROGRESS');
    const btnColor = computed(() => statusToColor[scrapingStatus.value]);
    const showAccountCards = computed(() => scrapingStatus.value !== 'NOT_STARTED');
    const enableRun = computed(() => config.getActiveImporters.length && config.getActiveExporters.length);

    const accountsState = ref(new AccountsState(config.getActiveImporters, config.getActiveExporters));

    const eventEmitter = new BudgetTrackingEventEmitter();

    initEventHandlers(eventEmitter, accountsState);

    const scrape = () => {
      generalError.value = '';
      accountsState.value = new AccountsState(config.getActiveImporters, config.getActiveExporters);
      accountsState.value.setPendingStatus();
      scrapingStatus.value = 'IN_PROGRESS';
      scrapeAndUpdateOutputVendors(store.getters.Config.getState, eventEmitter)
        .then(() => scrapingStatus.value = 'SUCCESS')
        .catch((e) => {
          accountsState.value.clear();
          generalError.value = e.message;
          return scrapingStatus.value = 'FAILURE';
        });
    };

    return {
      inProgress,
      btnColor,
      scrape,
      accountsState,
      showAccountCards,
      generalError,
      enableRun
    };
  },
});

function initEventHandlers(eventEmitter: BudgetTrackingEventEmitter, accountsState: Ref<UnwrapRef<AccountsState>>) {
  eventEmitter.onAny((eventName, eventData) => {
    const message = eventData?.message || eventName;
    const logLevel: Levels = eventData?.error ? 'error' : 'info';
    logger[logLevel](message);
    return handleEvent({ ...eventData, message, level: logLevel }, accountsState.value);
  });
  initAnalyticsEventHandling(eventEmitter);
}
</script>

<style scoped>
.run-button-row {
  flex: 0.5;
}
.container {
  height: 100%;
}
.general-error-text {
  margin-top: 15px;
}
</style>
