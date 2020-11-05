<template>
  <v-form
    ref="vForm"
    v-model="validated"
  >
    <div v-if="isTokenValid">
      <v-checkbox
        v-model="exporter.active"
        class="ma-0"
        label="Active"
        @change="changed = true"
      />
      <v-combobox
        v-model="selectedSpreadsheet"
        :items="userSpreadsheets"
        clearable
        label="Choose Spreadsheet"
        item-text="name"
        item-value="id"
        :rules="[rules.required]"
        @change="changed = true"
      />
      <v-alert
        v-show="isNewSpreadsheet"
        type="info"
      >
        Will create a new spreadsheet
      </v-alert>
      <v-btn
        :disabled="!readyToSave.value"
        color="primary"
        @click="submit()"
      >
        Save
      </v-btn>
    </div>

    <div v-else>
      <v-btn
        color="primary"
        @click="login()"
      >
        Login to Google
      </v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { OutputVendorName } from '@/originalBudgetTrackingApp/commonTypes';
import { GoogleSheetsConfig } from '@/originalBudgetTrackingApp/configManager/configManager';
import { setupExporterConfigForm } from '@/components/app/exporters/exportersCommon';
import {
  ref, onMounted, watch, computed
} from '@vue/composition-api';
import { validateToken, createClient } from '@/originalBudgetTrackingApp/export/outputVendors/googleSheets/googleAuth';
import { required } from '@/components/shared/formValidations';
import { getAllSpreadsheets, Spreadsheet } from '@/originalBudgetTrackingApp/export/outputVendors/googleSheets/googleSheetsInternalAPI';
import ElectronLogin from './ElectronGoogleOAuth2Connector';

export default Vue.extend({
  name: 'SpreadsheetExporter',

  setup() {
    const dataToReturn = setupExporterConfigForm(OutputVendorName.GOOGLE_SHEETS);

    const exporter = ref(dataToReturn.exporter as GoogleSheetsConfig);
    const isTokenValid = ref(false);
    const userSpreadsheets = ref([] as Spreadsheet[]);
    const selectedSpreadsheet = computed({
      get: () => {
        if (!exporter.value.options.spreadsheetId) return null;
        return userSpreadsheets.value.find(({ id }) => id === exporter.value.options.spreadsheetId) || {
          // TODO: Try to return onli exporter.value.options.spreadsheetId
          id: exporter.value.options.spreadsheetId,
          name: exporter.value.options.spreadsheetId
        };
      },
      set: (spreadsheet) => {
        exporter.value.options.spreadsheetId = spreadsheet?.id || spreadsheet as string;
      }
    });
    const isNewSpreadsheet = computed(() => selectedSpreadsheet.value
        && selectedSpreadsheet.value.id
        && selectedSpreadsheet.value.id === selectedSpreadsheet.value.name);

    watch(isTokenValid, async (valid) => {
      if (valid) {
        const authClient = await createClient(exporter.value.options.credentials);
        userSpreadsheets.value = (await getAllSpreadsheets(authClient)) || [];
      }
    });

    onMounted(async () => {
      isTokenValid.value = await validateToken(exporter.value.options.credentials);
    });

    const login = () => ElectronLogin()
      .then((credentials) => {
        exporter.value.options.credentials = credentials;
        return dataToReturn.submit();
      })
      .then(() => {
        isTokenValid.value = true;
      });

    return {
      ...dataToReturn,
      isTokenValid,
      login,
      userSpreadsheets,
      isNewSpreadsheet,
      selectedSpreadsheet,
      rules: {
        required
      }
    };
  }
});
</script>

<style></style>
