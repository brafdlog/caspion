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
    <v-select
      v-model="exporter.options.budgetId"
      :items="budgets"
      item-text="name"
      item-value="id"
      label="Budget id"
      :loading="accessTokenValid && !budgets"
      :disabled="!accessTokenValid"
      outlined
      :rules="[rules.required]"
      @change="changed = true"
    />
    <div
      v-if="accessTokenValid && budgetIdDefined"
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
  ref, defineComponent, watch, computed, toRef, Ref
} from '@vue/composition-api';
import { required } from '@/ui/components/shared/formValidations';
import { getBudgets, isAccessTokenValid } from '@/backend/export/outputVendors/ynab/ynab';
import { YnabConfig } from '@/backend/configManager/configManager';
import { getYnabAccountData } from '@/manual/setupHelpers';
import defaultConfig from '@/backend/configManager/defaultConfig';

export default defineComponent({
  components: { YnabAccountMappingTable },

  setup() {
    const mappingTable = ref<MappingTable>();
    const dataToReturn = setupExporterConfigForm(OutputVendorName.YNAB);

    const accessTokenValid = ref(true);
    const ynabAccounts = ref();
    const financialAccounts = ref();
    const loading = ref(false);
    const budgets = ref();

    const ynabConfig = toRef(dataToReturn, 'exporter') as Ref<YnabConfig>;
    const ynabOptions = toRef(ynabConfig.value, 'options');
    const accessToken = toRef(ynabOptions.value, 'accessToken');

    const budgetIdDefined = computed(() => {
      return ynabOptions.value.budgetId !== defaultConfig.outputVendors.ynab?.options.budgetId;
    });
    watch([accessTokenValid, budgetIdDefined, accessToken], async () => {
      accessTokenValid.value = await isAccessTokenValid(accessToken.value);
      if (accessTokenValid.value) {
        budgets.value = await getBudgets(accessToken.value);
        if (budgetIdDefined.value) {
          await fetchYnabAccountInfo();
        }
      }
    }, { immediate: true });

    async function fetchYnabAccountInfo() {
      const { budgetId } = ynabOptions.value;
      loading.value = true;

      const accountData = await getYnabAccountData(ynabConfig.value);

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
      loading,
      budgetIdDefined,
      budgets
    };
  }
});
</script>

<style scoped>
#accountMappingTableContainer {
  position: relative;
}

</style>
