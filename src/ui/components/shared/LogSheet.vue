<template>
  <v-bottom-sheet
    v-model="sheet"
    scrollable
  >
    <v-card>
      <v-card-title>
        Current Log
      </v-card-title>
      <v-card-subtitle v-show="!raw">
        Showing the last 10 rows
      </v-card-subtitle>
      <v-card-text style="height: 30vh;">
        <log-lines :entries="textToShow" />
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { getLastLines } from '@/logging/logger';
import LogLines from './LogLines';

export default defineComponent({
  name: 'LogSheet',
  components: {
    LogLines
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    raw: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    sheet: {
      get() { return this.value; },
      set(visible) { this.$emit('input', visible); },
    },
    textToShow() {
      if (this.raw) return this.raw;

      return getLastLines(10);
    },
  },
});
</script>

<style>

</style>
