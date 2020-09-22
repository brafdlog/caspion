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
    <div>
      <log-lines :entries="entries" />
    </div>
    <div>
      <config-editor />
    </div>
  </div>
</template>

<script lang="ts">
import { EOL } from 'os';
import LogLines from '@/components/shared/LogLines.vue';
import Vue from 'vue';
import { ref, computed } from '@vue/composition-api';
import { scrapeAndUpdateOutputVendors, EventEmitter } from '@/originalBudgetTrackingApp';
import ConfigEditor from './ConfigEditor.vue';

const colors = {
  success: 'green',
  failed: 'red',
  unknown: null
};

export default Vue.extend({
  components: {
    LogLines, ConfigEditor
  },
  setup() {
    const inProgress = ref(false);
    const succeeded = ref('unknown' as keyof typeof colors);
    const btnColor = computed(() => colors[succeeded.value]);
    const logs = ref([] as string[]);
    const entries = computed(() => logs.value.join(EOL))

    const eventPublisher = new EventEmitter.BudgetTrackingEventEmitter();
    eventPublisher.onAny((eventName, data) => {
      logs.value.push(data?.message || eventName);
    });

    const scrape = () => {
      scrapeAndUpdateOutputVendors(eventPublisher);
    };

    return { inProgress, btnColor, scrape, entries };
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
}

</style>
