<template>
  <div>
    <v-combobox
      :value="spreadsheet"
      :items="userSpreadsheets"
      clearable
      label="Choose Spreadsheet"
      item-text="name"
      item-value="id"
      :rules="[rules.required, rules.existedSpreadsheetRule]"
      :return-object="false"
      v-on="listeners"
    />
    <v-btn
      v-show="isNewSpreadsheet"
      :loading="creating"
      @click="createNewSpreadsheet"
    >
      create
    </v-btn>
  </div>
</template>

<script lang="ts">
import {
  computed, ref, onMounted, defineComponent, PropType
} from '@vue/composition-api';
import { getAllSpreadsheets, Spreadsheet, createSpreadhseet } from '@/originalBudgetTrackingApp/export/outputVendors/googleSheets/googleSheetsInternalAPI';
import { Credentials, createClient, OAuth2Client } from '@/originalBudgetTrackingApp/export/outputVendors/googleSheets/googleAuth';
import { required } from '@/components/shared/formValidations';

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
    const auth = ref<OAuth2Client>();

    const creating = ref(false);

    onMounted(async () => {
      auth.value = createClient(props.credentials);
      userSpreadsheets.value = await getAllSpreadsheets(auth.value);
    });

    const existedSpreadsheet = computed(() => userSpreadsheets.value.find(({ id }) => id === props.value));
    const spreadsheet = computed(() => existedSpreadsheet.value || props.value);
    const isNewSpreadsheet = computed(() => props.value && !existedSpreadsheet.value);
    const existedSpreadsheetRule = (value) => {
      return !value
      || !!value.name
      || !!userSpreadsheets.value.find(({ id }) => id === value)
      || 'you must to create the new spreadsheet';
    };

    const createNewSpreadsheet = async () => {
      if (isNewSpreadsheet.value && auth.value) {
        creating.value = true;
        const newSpreadsheet = await createSpreadhseet(props.value!, auth.value).then(({ data }) => data);
        creating.value = false;
        userSpreadsheets.value.push({ id: newSpreadsheet.spreadsheetId, name: newSpreadsheet.properties?.title });
        listeners.input?.(newSpreadsheet.spreadsheetId);
        listeners.change?.(newSpreadsheet.spreadsheetId);
      }
    };

    return {
      createNewSpreadsheet,
      spreadsheet,
      userSpreadsheets,
      isNewSpreadsheet,
      emit,
      rules: {
        required,
        existedSpreadsheetRule
      },
      listeners,
      creating
    };
  }

});
</script>

<style>

</style>
