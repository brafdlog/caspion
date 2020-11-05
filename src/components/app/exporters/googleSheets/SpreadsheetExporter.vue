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
      <spreasheet-form
        v-model="exporter.options.spreadsheetId"
        :credentials="exporter.options.credentials"
        @change="changed = true"
      />
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
import { ref, onMounted } from '@vue/composition-api';
import { validateToken } from '@/originalBudgetTrackingApp/export/outputVendors/googleSheets/googleAuth';
import ElectronLogin from './ElectronGoogleOAuth2Connector';
import SpreasheetForm from './SpreadsheetForm.vue';

export default Vue.extend({
  name: 'SpreadsheetExporter',
  components: { SpreasheetForm },

  setup() {
    const dataToReturn = setupExporterConfigForm(OutputVendorName.GOOGLE_SHEETS);

    const exporter = ref(dataToReturn.exporter as GoogleSheetsConfig);
    const isTokenValid = ref(false);

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
    };
  }
});
</script>

<style></style>
