<template>
  <v-form
    ref="vForm"
    v-model="validated"
  >
    <v-checkbox
      v-model="exporter.active"
      label="Active"
      hide-details="auto"
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
      :account-numbers-to-ynab-account-ids="accountNumbersToYnabAccountIdsArray"
      @mappingChanged="markChanged()"
      @addAccountMapping="addAccountMapping()"
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
            @click="addAccountMapping()"
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
import { computed } from '@vue/composition-api';
import YnabAccountMappingTable from '@/components/app/exporters/YnabAccountMappingTable.vue';
import { YnabConfig } from '@/originalBudgetTrackingApp/configManager/configManager';

export default Vue.extend({
  name: 'YnabExporter',

  components: { YnabAccountMappingTable },

  setup() {
    const dataToReturn = setupExporterConfigForm(OutputVendorName.YNAB);
    const ynabConfig = dataToReturn.exporter as YnabConfig;
    const accountNumbersToYnabAccountIdsArray = computed(() => {
      return Object.keys(ynabConfig.options.accountNumbersToYnabAccountIds).map((accountNumber) => ({
        accountNumber,
        ynabAccountId: ynabConfig.options.accountNumbersToYnabAccountIds[accountNumber]
      }));
    });

    return {
      ...dataToReturn,
      accountNumbersToYnabAccountIdsArray,
      submit: () => {
        const updatedAccountNumbersToYnabAccountIds = {};
        accountNumbersToYnabAccountIdsArray.value.forEach(({ accountNumber, ynabAccountId }) => {
          updatedAccountNumbersToYnabAccountIds[accountNumber] = ynabAccountId;
        });
        ynabConfig.options.accountNumbersToYnabAccountIds = updatedAccountNumbersToYnabAccountIds;

        dataToReturn.submit();
      },
      deleteAccountMapping: (accountNumber) => {
        Vue.delete(ynabConfig.options.accountNumbersToYnabAccountIds, accountNumber);
        dataToReturn.changed.value = true;
      },
      addAccountMapping: () => {
        Vue.set(ynabConfig.options.accountNumbersToYnabAccountIds, '###', '###');
      },
      markChanged: () => {
        dataToReturn.changed.value = true;
      }
    };
  }
});
</script>

<style scoped>

</style>
