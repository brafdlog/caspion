<template>
  <v-form>
    <div
      v-if="isLogin"
    >
      <v-autocomplete
        v-if="!createNewSheet"
        v-model="properties.spreadsheetId"
        :loading="isLoadingSheets"
        :items="properties.spreadsheets"
        :search-input.sync="search"
        clearable
        hide-details
        hide-selected
        item-text="name"
        item-value="id"
        label="Choose Spreadsheet"
      />
      <v-text-field
        v-else
        v-model="properties.spreadsheetId"
        label="Name"
        outlined
      />
      <v-switch
        label="Create new sheet"
        @change="resetSheet"
      />
      <v-alert
        v-show="isNewSpreadsheet"
        type="info"
      >
        Will create a new spreadsheet
      </v-alert>
      <v-btn
        :disabled="!properties.spreadsheetId"
        color="primary"
        :loading="loading"
        @click="submitForm()"
      >
        Export
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

<script>
import { mapState, mapActions } from 'vuex';
import { isConnected, CreateClient } from '@/modules/spreadsheet/googleOAuth2';
import { listAllSpreadsheets, createNewSpreadsheet, saveTransactionsToGoogleSheets } from '@/modules/spreadsheet/spreadsheet';

const name = 'SpreadsheetExporter';
const title = 'Export to Google Spreadsheet';

export default {
  name,
  title,
  data() {
    return {
      properties: {
        spreadsheets: [],
        spreadsheetId: null,
      },
      oauth2Client: null,
      loading: false,
      isLoadingSheets: false,
      search: null,
      createNewSheet: false,
    };
  },
  computed: {
    isLogin() {
      return this.oauth2Client !== null;
    },
    isNewSpreadsheet() {
      return this.properties.spreadsheetId
      && !this.properties.spreadsheets.map((spreadsheet) => spreadsheet.id)
        .includes(this.properties.spreadsheetId);
    },
    ...mapState({
      storeProperties: (state) => state.Exporters[name],
      transactions: (state) => state.Transactions.transactions,
    }),
  },
  watch: {
    search() {
      // Items have already been loaded
      if (this.properties.spreadsheets.length > 0) return;

      this.isLoadingSheets = true;

      // Lazily load input items
      listAllSpreadsheets(this.oauth2Client)
        .then((res) => {
          this.properties.spreadsheets = res;
        })
        .catch((e) => {
          this.$logger.error(e.message);
        })
        .finally(() => { this.isLoadingSheets = false; });
    },
  },
  created() {
    this.properties = { ...this.properties, ...this.storeProperties };
    isConnected().then((connected) => {
      if (connected) {
        this.login();
      }
    });
  },
  methods: {
    ...mapActions(['saveExporterProperties']),
    emitStatus(success, message) {
      this.$emit('update:success', success);
      this.$emit('update:message', message);
    },
    async submitForm() {
      this.loading = true;
      try {
        if (this.isNewSpreadsheet) {
          await this.createNewSpreadsheet();
        }

        const result = await saveTransactionsToGoogleSheets(
          this.oauth2Client,
          this.properties.spreadsheetId,
          this.transactions,
        );

        const statusMessage = result.status === 200
          ? `There were ${result.existTransactions} transactions in the sheet. `
            + `We were asked to add ${Object.keys(this.transactions).length} transactions, `
            + `and now there are ${result.updatedTransactions}.`
          : result.statusText || 'Unknown error';

        this.emitStatus(
          result.status === 200,
          statusMessage,
        );

        this.saveExporterProperties({ name, properties: this.properties });
      } catch (error) {
        this.$logger.error(error.message);
        if (error.stack) this.$logger.verbose(error.stack);
        this.emitStatus(false, error.message);
      } finally {
        this.loading = false;
      }
    },
    async login() {
      try {
        this.oauth2Client = await CreateClient();
      } catch (e) {
        this.$logger.error(e.message);
        if (e.stack) this.$logger.verbose(e.stack);
      }
    },
    async createNewSpreadsheet() {
      this.$logger.info(`Creating new spreadsheet: '${this.properties.spreadsheetId}'`);
      const spreadsheet = await createNewSpreadsheet(
        this.oauth2Client,
        this.properties.spreadsheetId,
      );
      const spreadsheetStructured = {
        id: spreadsheet.spreadsheetId,
        name: spreadsheet.properties.title,
      };
      this.$logger.info(`Created new spreadsheet: '${JSON.stringify(spreadsheetStructured)}'`);
      this.properties.spreadsheets.push(spreadsheetStructured);
      this.properties.spreadsheetId = spreadsheetStructured.id;
      this.createNewSheet = false;
    },
    resetSheet() {
      this.properties.spreadsheetId = '';
      this.createNewSheet = !this.createNewSheet;
    },
  },
};
</script>

<style></style>
