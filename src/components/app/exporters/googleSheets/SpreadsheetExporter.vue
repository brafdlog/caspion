<template>
  <v-form
    ref="vForm"
    v-model="validated"
  >
    <div v-if="status === Status.LOGGED_IN">
      <v-checkbox
        v-model="exporter.active"
        class="ma-0"
        label="Active"
        @change="changed = true"
      />
      <sheets-combobox
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

    <div v-else-if="status === Status.LOGIN">
      <v-btn
        color="primary"
        @click="login()"
      >
        Login to Google
      </v-btn>
    </div>

    <v-alert
      v-else-if="status === Status.ERROR"
      type="error"
    >
      {{ errorMessage }}
    </v-alert>

    <v-skeleton-loader
      v-else
      type="article, actions"
    />
  </v-form>
</template>

<script lang="ts">
import { OutputVendorName } from '@/originalBudgetTrackingApp/commonTypes';
import { GoogleSheetsConfig } from '@/originalBudgetTrackingApp/configManager/configManager';
import { setupExporterConfigForm } from '@/components/app/exporters/exportersCommon';
import { ref, onMounted, defineComponent } from '@vue/composition-api';
import { validateToken } from '@/originalBudgetTrackingApp/export/outputVendors/googleSheets/googleAuth';
import ElectronLogin from './electronGoogleOAuth2Connector';
import SheetsCombobox from './SheetsCombobox.vue';

enum Status {
  LOADING, LOGGED_IN, LOGIN, ERROR
}

export default defineComponent({
  components: { SheetsCombobox },

  setup() {
    const status = ref(Status.LOADING);
    const errorMessage = ref('');

    const dataToReturn = setupExporterConfigForm(OutputVendorName.GOOGLE_SHEETS);
    const exporter = ref(dataToReturn.exporter as GoogleSheetsConfig);

    onMounted(async () => {
      const valid = await validateToken(exporter.value.options.credentials);
      status.value = valid ? Status.LOGGED_IN : Status.LOGIN;
    });

    const login = async () => {
      try {
        status.value = Status.LOADING;

        exporter.value.options.credentials = await ElectronLogin();
        await dataToReturn.submit();

        status.value = Status.LOGGED_IN;
      } catch (ex) {
        status.value = Status.ERROR;
        errorMessage.value = ex.message || ex;
      }
    };

    return {
      ...dataToReturn,
      status,
      Status,
      login,
      errorMessage
    };
  }
});
</script>

<style></style>
