<template>
  <div class="logs-container">
    <div
      v-for="(accountEntry, i) in accountEntries"
      :key="i"
      class="card-container"
    >
      <v-card elevation="4">
        <v-card-title> {{ accountEntry.accountName }}</v-card-title>
        <v-card-subtitle> {{ accountEntry.entries[accountEntry.entries.length - 1].message }}</v-card-subtitle>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api';
import { BudgetTrackingEvent } from '@/originalBudgetTrackingApp';
import { Levels } from './types';

const levelToClass = {
  [Levels.Error]: 'error-line',
  [Levels.Warn]: 'warn-line',
  [Levels.Info]: 'info-line'
};

export default defineComponent({
  props: {
    entries: {
      type: Array as PropType<BudgetTrackingEvent[]>,
      required: true
    },
  },
  setup(props) {
    const getClass = (level: Levels) => levelToClass[level];
    const accountEntries = computed<{ accountName: string, entries: BudgetTrackingEvent[] }[]>(() => {
      const accountToEntriesMap = new Map<string, BudgetTrackingEvent[]>();
      props.entries.forEach((entry: BudgetTrackingEvent) => {
        const vendorName = entry.vendorName || 'General';
        if (!accountToEntriesMap.has(vendorName)) {
          accountToEntriesMap.set(vendorName, []);
        }
        accountToEntriesMap.get(vendorName)!.push(entry);
      });
      const accountEntriesArray = Array.from(accountToEntriesMap.keys()).map((accountName) => {
        return {
          accountName,
          entries: accountToEntriesMap.get(accountName) || []
        };
      });
      return accountEntriesArray;
    });
    return { getClass, accountEntries };
  }
});
</script>

<style scoped>
.logs-container {
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-line;
  color: rgba(0, 0, 0, 0.6);
  font-family: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 14px;
  line-height: 25px;
  padding-left: 5px;
}

.logs-container > p {
  margin-bottom: 0;
  border-bottom: solid 1px #80808038;
}

.logs-container .error-line {
  color: rgb(240, 0, 0);
}

.logs-container .warn-line {
  color: rgb(225, 125, 50);
}

.logs-container .info-line {
  color: rgb(0, 125, 60);
}

.card-container {
  margin: 20px;
  max-width: 600px;
}
</style>
