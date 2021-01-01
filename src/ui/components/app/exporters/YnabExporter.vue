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
      :rules="[rules.required]"
      @change="changed = true"
    />
    <v-text-field
      v-model="exporter.options.budgetId"
      label="Budget id"
      outlined
      :rules="[rules.required]"
      @change="changed = true"
    />
    <ynab-account-mapping-table
      ref="mappingTable"
      v-model="exporter.options.accountNumbersToYnabAccountIds"
      @change="changed = true"
    />
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
import { ref, defineComponent } from '@vue/composition-api';
import { required } from '@/ui/components/shared/formValidations';

export default defineComponent({
  components: { YnabAccountMappingTable },

  setup() {
    const mappingTable = ref<MappingTable>();
    const dataToReturn = setupExporterConfigForm(OutputVendorName.YNAB);

    return {
      mappingTable,
      ...dataToReturn,
      addAccountMapping: () => mappingTable.value?.addItem(),
      rules: {
        required
      }
    };
  }
});
</script>

<style scoped>

</style>
