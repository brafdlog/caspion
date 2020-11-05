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
import { validateToken, OAuth2Client, createClient } from '@/originalBudgetTrackingApp/export/outputVendors/googleSheets/googleAuth';
import { google, drive_v3 as driveV3 } from 'googleapis';
import { required } from '@/components/shared/formValidations';
import ElectronLogin from './ElectronGoogleOAuth2Connector';

const listAllSpreadsheets = async (auth:OAuth2Client) => {
  const drive = google.drive({ version: 'v3', auth });

  const response = await drive.files.list({
    q: 'mimeType="application/vnd.google-apps.spreadsheet"',
  });

  return response.data.files || [];
};

type Spreadsheet = Pick<driveV3.Schema$File, 'id'| 'name'>

const name = 'SpreadsheetExporter';

export default Vue.extend({
  name,

  setup() {
    const dataToReturn = setupExporterConfigForm(OutputVendorName.GOOGLE_SHEETS);

    const exporter = ref(dataToReturn.exporter as GoogleSheetsConfig);
    const isTokenValid = ref(false);
    const userSpreadsheets = ref([] as Spreadsheet[]);
    const isNewSpreadsheet = computed(() => !userSpreadsheets.value.find(({ id }) => id === exporter.value.options.spreadsheetId));
    const selectedSpreadsheet = computed({
      get: () => {
        if (!exporter.value.options.spreadsheetId) return null;
        return userSpreadsheets.value.find(({ id }) => id === exporter.value.options.spreadsheetId) || {
          id: exporter.value.options.spreadsheetId,
          name: exporter.value.options.spreadsheetId
        };
      },
      set: (spreadsheet) => {
        exporter.value.options.spreadsheetId = spreadsheet?.id || spreadsheet as string;
      }
    });

    watch(isTokenValid, async (valid) => {
      if (valid) {
        const authClient = await createClient(exporter.value.options.credentials);
        userSpreadsheets.value = await listAllSpreadsheets(authClient);
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
