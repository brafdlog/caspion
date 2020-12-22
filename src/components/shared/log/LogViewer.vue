<template>
  <div class="logs-container">
    <v-container>
      <v-row>
        <v-col>
          <div
            v-for="(importer) in accountsState.importers"
            :key="importer.id"
          >
            <account-card :account-state="importer" />
          </div>
        </v-col>
        <v-col>
          <div
            v-for="(exporter) in accountsState.exporters"
            :key="exporter.id"
          >
            <account-card :account-state="exporter" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { AccountsState } from '@/components/app/accountsState';
import AccountCard from '@/components/shared/log/AccountCard.vue';
import { Levels } from './types';

const levelToClass = {
  [Levels.Error]: 'error-line',
  [Levels.Warn]: 'warn-line',
  [Levels.Info]: 'info-line'
};

export default defineComponent({
  components: { AccountCard },
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
</style>
