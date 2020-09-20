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
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Account number</th>
            <th>Ynab account id</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="accountNumberAndId in accountNumbersToYnabAccountIdsArray"
            :key="accountNumberAndId.accountNumber"
          >
            <td>
              <v-text-field
                v-model="accountNumberAndId.accountNumber"
                full-width
                dense
                @change="changed = true"
              />
            </td>
            <td>
              <v-text-field
                v-model="accountNumberAndId.ynabAccountId"
                full-width
                dense
                @change="changed = true"
              />
            </td>
            <td>
              <v-btn
                icon
                color="red"
                @click="deleteAccountMapping(accountNumberAndId.accountNumber)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
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
import omit from 'lodash/omit';
import { setupExporterConfigForm } from '@/components/app/exporters/exportersCommon';
import { OutputVendorName } from '@/originalBudgetTrackingApp/commonTypes';
import { computed } from '@vue/composition-api';
import { YnabConfig } from '@/originalBudgetTrackingApp/configManager/configManager';

export default Vue.extend({
  name: 'YnabExporter',

  setup() {
    const dataToReturn = setupExporterConfigForm(OutputVendorName.YNAB);
    const ynabConfig = dataToReturn.exporter as YnabConfig;
    const accountNumbersToYnabAccountIdsArray = computed(() => {
      const { accountNumbersToYnabAccountIds } = ynabConfig.options;
      return Object.keys(accountNumbersToYnabAccountIds).map((accountNumber) => ({
        accountNumber,
        ynabAccountId: accountNumbersToYnabAccountIds[accountNumber]
      }));
    });

    return {
      ...dataToReturn,
      ynabConfig,
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
        ynabConfig.options.accountNumbersToYnabAccountIds = omit(ynabConfig.options.accountNumbersToYnabAccountIds, accountNumber);
        dataToReturn.changed.value = true;
      },
      addAccountMapping: () => {
        ynabConfig.options.accountNumbersToYnabAccountIds = { ...ynabConfig.options.accountNumbersToYnabAccountIds, '###': '###' };
      }
    };
  }
});
</script>

<style scoped>

</style>
