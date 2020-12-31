<template>
  <v-form
    ref="vForm"
    v-model="validated"
  >
    <v-checkbox
      v-model="exporter.active"
      class="ma-0"
      label="Active"
      @change="changed = true"
    />
    <v-text-field
      v-model="exporter.options.accessToken"
      type="password"
      label="Access Token"
      outlined
      :rules="[rules.required, accessTokenValid]"
      @change="changed = true"
    />
    <v-text-field
      v-model="exporter.options.budgetId"
      label="Budget id"
      outlined
      :rules="[rules.required]"
      @change="changed = true"
    />
    <div
      v-if="accessTokenValid"
      id="accountMappingTableContainer"
    >
      <v-overlay
        absolute
        :value="loading"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          size="25"
        />
      </v-overlay>
      <ynab-account-mapping-table
        ref="mappingTable"
        v-model="exporter.options.accountNumbersToYnabAccountIds"
        :accounts-info="{ ynabAccounts, financialAccounts }"
        @change="changed = true"
      />
    </div>
    <v-container>
      <v-row>
        <v-col cols="10">
          <v-btn
            color="primary"
            :disabled="!readyToSave"
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
import { setupExporterConfigForm } from '@/ui/components/app/exporters/exportersCommon';
import { OutputVendorName } from '@/backend/commonTypes';
import YnabAccountMappingTable, { MappingTable } from '@/ui/components/app/exporters/YnabAccountMappingTable.vue';
import {
  ref, defineComponent, watchEffect
} from '@vue/composition-api';
import { required } from '@/ui/components/shared/formValidations';
import { isAccessTokenValid } from '@/backend/export/outputVendors/ynab/ynab';
import { YnabConfig } from '@/backend/configManager/configManager';
import { getYnabAccountData } from '@/manual/setupHelpers';

export default defineComponent({
  components: { YnabAccountMappingTable },

  setup() {
    const mappingTable = ref<MappingTable>();
    const dataToReturn = setupExporterConfigForm(OutputVendorName.YNAB);

    const accessTokenValid = ref(true);
    const ynabAccounts = ref();
    const financialAccounts = ref();
    const loading = ref(false);

    const ynabConfig = dataToReturn.exporter as YnabConfig;

    watchEffect(async () => {
      accessTokenValid.value = await isAccessTokenValid(ynabConfig.options.accessToken);
      if (accessTokenValid.value && ynabConfig.options.budgetId) {
        await fetchYnabAccountInfo();
      }
    });

    async function fetchYnabAccountInfo() {
      const { budgetId } = ynabConfig.options;
      loading.value = true;

      const accountData = await getYnabAccountData();

      ynabAccounts.value = accountData.ynabAccountData.accounts.filter((ynabAccount) => {
        return ynabAccount.budgetId === budgetId && ynabAccount.active;
      });
      financialAccounts.value = accountData.financialAccountDetails;
      loading.value = false;
    }

    return {
      mappingTable,
      ...dataToReturn,
      addAccountMapping: () => mappingTable.value?.addItem(),
      rules: {
        required
      },
      ynabAccounts,
      financialAccounts,
      accessTokenValid,
      loading
    };
  }
});
</script>

<style scoped>
#accountMappingTableContainer {
  position: relative;
}

</style>
