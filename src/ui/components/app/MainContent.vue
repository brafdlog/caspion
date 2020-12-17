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
  computed, defineComponent, reactive, ref
} from '@vue/composition-api';
import { EventEmitter, scrapeAndUpdateOutputVendors } from '@/originalBudgetTrackingApp';
import { AccountsState, handleEvent } from '@/ui/components/app/accountsState';
import store from '@/ui/store';
import ConfigEditor from '@/ui/components/app/ConfigEditor.vue';
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
    const generalError = ref<string>('');
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
      generalError.value = '';
      accountsState.clear();
      accountsState.setPendingStatus();
      scrapingStatus.value = 'IN_PROGRESS';
      scrapeAndUpdateOutputVendors(eventEmitter)
        .then(() => scrapingStatus.value = 'SUCCESS')
        .catch((e) => {
          accountsState.clear();
          generalError.value = e.message;
          return scrapingStatus.value = 'FAILURE';
        });
    };

    return {
      inProgress, btnColor, scrape, accountsState, showAccountCards, generalError
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
.general-error-text {
  margin-top: 15px;
}
</style>
