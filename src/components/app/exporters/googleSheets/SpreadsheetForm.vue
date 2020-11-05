<template>
  <div>
    <v-combobox
      :value="spreadsheetObj"
      :items="userSpreadsheets"
      clearable
      label="Choose Spreadsheet"
      item-text="name"
      item-value="id"
      :rules="[rules.required]"
      @input="input"
      @change="emit('change')"
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
// TODO: Rename to dropbox or something
import {
  computed, ref, onMounted, defineComponent, PropType
} from '@vue/composition-api';
import { getAllSpreadsheets, Spreadsheet } from '@/originalBudgetTrackingApp/export/outputVendors/googleSheets/googleSheetsInternalAPI';
import { Credentials, createClient } from '@/originalBudgetTrackingApp/export/outputVendors/googleSheets/googleAuth';
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
  setup(props, { emit }) {
    const userSpreadsheets = ref([] as Spreadsheet[]);
    onMounted(async () => {
      const authClient = await createClient(props.credentials);
      userSpreadsheets.value = await getAllSpreadsheets(authClient);
    });

    const spreadsheetObj = computed(() => {
      if (!props.value) return null;
      const exists = userSpreadsheets.value.find(({ id }) => id === props.value);
      return exists || {
        // TODO: Try to return onli exporter.value.options.spreadsheetId
        // TODO: backend need handle not-existed spreadsheet
        id: props.value,
        name: props.value
      };
    });

    const isNewSpreadsheet = computed(() => props.value
        && spreadsheetObj.value?.id
        && spreadsheetObj.value.id === spreadsheetObj.value.name);

    const input = (value) => {
      const retVal = (value && value.id) || value;
      // TODO: try :return-object="false"
      emit('input', retVal);
    };

    return {
      spreadsheetObj,
      userSpreadsheets,
      isNewSpreadsheet,
      emit,
      input,
      rules: {
        required
      }
    };
  }

});
</script>

<style>

</style>
