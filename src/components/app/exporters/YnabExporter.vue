<template>
  <v-form
    ref="vForm"
    v-model="validated"
  >
    <v-checkbox
      v-model="exporter.active"
      label="Active"
      @change="changed = true"
    />
    <v-text-field
      v-model="exporter.options.accessToken"
      type="password"
      label="Access Token"
      outlined
      @change="changed = true"
    />
    <v-text-field
      v-model="exporter.options.budgetId"
      label="Budget id"
      outlined
      @change="changed = true"
    />
    <ynab-account-mapping-table
      ref="mappingTable"
      v-model="exporter.options.accountNumbersToYnabAccountIds"
      @change="changed = true"
      @deleteAccountMapping="deleteAccountMapping($event)"
    />
    <v-container>
      <v-row>
        <v-col cols="10">
          <v-btn
            color="primary"
            :disabled="!readyToSave.value"
            @click="submit()"
          >
            Save
          </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn
            color="blue"
            fab
            dark
            small
            @click="addAccountMapping"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { setupExporterConfigForm } from '@/components/app/exporters/exportersCommon';
import { OutputVendorName } from '@/originalBudgetTrackingApp/commonTypes';
import YnabAccountMappingTable from '@/components/app/exporters/YnabAccountMappingTable.vue';
import { YnabConfig } from '@/originalBudgetTrackingApp/configManager/configManager';
import { ref } from '@vue/composition-api';

export default Vue.extend({
  name: 'YnabExporter',

  components: { YnabAccountMappingTable },

  setup() {
    const mappingTable = ref(null as any);
    const dataToReturn = setupExporterConfigForm(OutputVendorName.YNAB);
    const ynabConfig = dataToReturn.exporter as YnabConfig;

    return {
      mappingTable,
      ...dataToReturn,
      deleteAccountMapping: (accountNumber) => {
        Vue.delete(ynabConfig.options.accountNumbersToYnabAccountIds, accountNumber);
        dataToReturn.changed.value = true;
      },
      addAccountMapping: () => mappingTable.value.addItem(),
      markChanged: () => {
        dataToReturn.changed.value = true;
      }
    };
  }
});
</script>

<style scoped>

</style>
