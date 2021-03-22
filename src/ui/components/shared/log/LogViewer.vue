<template>
  <div class="logs-container">
    <v-container>
      <v-row>
        <v-col
          v-if="chromePercentage > 0"
          cols="12"
        >
          <v-progress-linear
            v-model="chromePercentage"
            height="25"
          >
            <strong>{{ downloadMessage }}</strong>
          </v-progress-linear>
        </v-col>
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
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { AccountsState } from '@/ui/components/app/accountsState';
import AccountCard from '@/ui/components/shared/log/AccountCard.vue';

export default defineComponent({
  components: { AccountCard },
  props: {
    accountsState: {
      type: Object as PropType<AccountsState>,
      required: true
    },
    chromePercentage: {
      type: Number,
      required: false,
      default: 0
    }
  },
  setup(props) {
    const downloadMessage = computed(() => (props.chromePercentage >= 100 ? 'Chrome Downloaded' : 'Downloading Chrome'));
    return { downloadMessage };
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

</style>
