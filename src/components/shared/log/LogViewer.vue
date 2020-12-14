<template>
  <div class="logs-container">
    <v-container>
      <v-row>
        <v-col>
          <div
            v-for="(importer) in accountsState.importers"
            :key="importer.id"
            class="card-container"
          >
            <v-card elevation="4">
              <v-card-title> {{ importer.name }}</v-card-title>
              <v-card-subtitle> {{ importer.events.length ? importer.events[importer.events.length - 1].message : '' }}</v-card-subtitle>
            </v-card>
          </div>
        </v-col>
        <v-col>
          <div
            v-for="(exporter) in accountsState.exporters"
            :key="exporter.id"
            class="card-container"
          >
            <v-card elevation="4">
              <v-card-title> {{ exporter.name }}</v-card-title>
              <v-card-subtitle> {{ exporter.events.length ? exporter.events[exporter.events.length - 1].message : '' }}</v-card-subtitle>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { AccountsState } from '@/components/app/AccountsState';
import { Levels } from './types';

const levelToClass = {
  [Levels.Error]: 'error-line',
  [Levels.Warn]: 'warn-line',
  [Levels.Info]: 'info-line'
};

export default defineComponent({
  props: {
    accountsState: {
      type: Object as PropType<AccountsState>,
      required: true
    },
  },
  setup() {
    const getClass = (level: Levels) => levelToClass[level];
    return { getClass };
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
