<template>
  <div class="logs-container">
    <p
      v-for="(entry, i) in entries"
      :key="i"
    >
      {{ entry.message }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { LogEntry } from './types';

export default Vue.extend({
  props: {
    entries: {
      type: Array as PropType<LogEntry[]>,
      required: true
    },
  },
});
</script>

<style scoped>
.logs-container {
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-line;
  color: rgba(0, 0, 0, 0.6);
}

.logs-container > p {
  margin-bottom: 0px;
}
</style>
