<template>
  <div>
    <v-combobox
      :value="spreadsheet"
      :items="userSpreadsheets"
      clearable
      label="Choose Spreadsheet"
      item-text="name"
      item-value="id"
      :rules="[rules.required]"
      :return-object="false"
      v-on="listeners"
    />
    <v-alert
      v-show="isNewSpreadsheet"
      type="info"
    >
      Will create a new spreadsheet
    </v-alert>
  </div>
</template>

<script lang="ts">
import {
  computed, ref, onMounted, defineComponent, PropType
} from '@vue/composition-api';
import { getAllSpreadsheets, Spreadsheet } from '@/originalBudgetTrackingApp/export/outputVendors/googleSheets/googleSheetsInternalAPI';
import { Credentials, createClient } from '@/originalBudgetTrackingApp/export/outputVendors/googleSheets/googleAuth';
import { required } from '@/ui/components/shared/formValidations';

export default defineComponent({
  props: {
    value: {
      type: String,
      required: false,
    },
    credentials: {
      type: Object as PropType<Credentials>,
      required: true
    }
  },
  setup(props, { emit, listeners }) {
    const userSpreadsheets = ref<Spreadsheet[]>([]);

    onMounted(async () => {
      userSpreadsheets.value = await getAllSpreadsheets(createClient(props.credentials));
    });

    const existedSpreadsheet = computed(() => userSpreadsheets.value.find(({ id }) => id === props.value));
    const spreadsheet = computed(() => existedSpreadsheet.value || props.value);
    const isNewSpreadsheet = computed(() => props.value && !existedSpreadsheet.value);

    return {
      spreadsheet,
      userSpreadsheets,
      isNewSpreadsheet,
      emit,
      rules: {
        required
      },
      listeners
    };
  }

});
</script>

<style>

</style>
