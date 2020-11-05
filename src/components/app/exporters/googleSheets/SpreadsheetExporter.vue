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

    watch(() => exporter.value.options.spreadsheetId, (x) => console.log('spreadsheetId', x));
    watch(userSpreadsheets, (x) => console.log(x));

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

// const title = 'Export to Google Spreadsheet';

// const comp = {
//   name,
//   title,
//   data() {
//     return {
//       properties: {
//         spreadsheets: [],
//         spreadsheetId: null,
//       },
//       oauth2Client: null,
//       loading: false,
//       isLoadingSheets: false,
//       search: null,
//       createNewSheet: false,
//     };
//   },
//   computed: {
//     isLogin() {
//       return this.oauth2Client !== null;
//     },
//     isNewSpreadsheet() {
//       return this.properties.spreadsheetId
//       && !this.properties.spreadsheets.map((spreadsheet) => spreadsheet.id)
//         .includes(this.properties.spreadsheetId);
//     },
//     ...mapState({
//       storeProperties: (state) => state.Exporters[name],
//       transactions: (state) => state.Transactions.transactions,
//     }),
//   },
//   watch: {
//     search() {
//       // Items have already been loaded
//       if (this.properties.spreadsheets.length > 0) return;

//       this.isLoadingSheets = true;

//       // Lazily load input items
//       listAllSpreadsheets(this.oauth2Client)
//         .then((res) => {
//           this.properties.spreadsheets = res;
//         })
//         .catch((e) => {
//           this.$logger.error(e.message);
//         })
//         .finally(() => { this.isLoadingSheets = false; });
//     },
//   },
//   created() {
//     this.properties = { ...this.properties, ...this.storeProperties };
//     isConnected().then((connected) => {
//       if (connected) {
//         this.login();
//       }
//     });
//   },
//   methods: {
//     ...mapActions(['saveExporterProperties']),
//     emitStatus(success, message) {
//       this.$emit('update:success', success);
//       this.$emit('update:message', message);
//     },
//     async submitForm() {
//       this.loading = true;
//       try {
//         if (this.isNewSpreadsheet) {
//           await this.createNewSpreadsheet();
//         }

//         const result = await saveTransactionsToGoogleSheets(
//           this.oauth2Client,
//           this.properties.spreadsheetId,
//           this.transactions,
//         );

//         const statusMessage = result.status === 200
//           ? `There were ${result.existTransactions} transactions in the sheet. `
//             + `We were asked to add ${Object.keys(this.transactions).length} transactions, `
//             + `and now there are ${result.updatedTransactions}.`
//           : result.statusText || 'Unknown error';

//         this.emitStatus(
//           result.status === 200,
//           statusMessage,
//         );

//         this.saveExporterProperties({ name, properties: this.properties });
//       } catch (error) {
//         this.$logger.error(error.message);
//         if (error.stack) this.$logger.verbose(error.stack);
//         this.emitStatus(false, error.message);
//       } finally {
//         this.loading = false;
//       }
//     },
//     async login() {
//       try {
//         this.oauth2Client = await CreateClient();
//       } catch (e) {
//         this.$logger.error(e.message);
//         if (e.stack) this.$logger.verbose(e.stack);
//       }
//     },
//     async createNewSpreadsheet() {
//       this.$logger.info(`Creating new spreadsheet: '${this.properties.spreadsheetId}'`);
//       const spreadsheet = await createNewSpreadsheet(
//         this.oauth2Client,
//         this.properties.spreadsheetId,
//       );
//       const spreadsheetStructured = {
//         id: spreadsheet.spreadsheetId,
//         name: spreadsheet.properties.title,
//       };
//       this.$logger.info(`Created new spreadsheet: '${JSON.stringify(spreadsheetStructured)}'`);
//       this.properties.spreadsheets.push(spreadsheetStructured);
//       this.properties.spreadsheetId = spreadsheetStructured.id;
//       this.createNewSheet = false;
//     },
//     resetSheet() {
//       this.properties.spreadsheetId = '';
//       this.createNewSheet = !this.createNewSheet;
//     },
//   },
// };
</script>

<style></style>
