<template>
  <el-form>
    <el-form-item
      v-if="isLogin"
    >
      <el-select
        v-model="properties.spreadsheetId"
        filterable
        allow-create
        default-first-option
        placeholder="Choose Spreadsheet"
      >
        <el-option
          v-for="spreadsheet in properties.spreadsheets"
          :key="spreadsheet.id"
          :label="spreadsheet.name"
          :value="spreadsheet.id"
        />
      </el-select>
      <el-alert
        v-show="isNewSpreadsheet"
        title="Will create a new spreadsheet"
        type="info"
        show-icon
      />
    </el-form-item>
    <el-form-item v-else>
      <el-button
        type="primary"
        @click="login()"
      >
        Login to Google
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button
        :disabled="!properties.spreadsheetId"
        type="primary"
        :loading="loading"
        @click="submitForm()"
      >
        Export
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { isConnected, CreateClient } from '@/modules/googleOauth';
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
  created() {
    this.properties = { ...this.properties, ...this.storeProperties };
    isConnected().then((isConnected) => {
      if (isConnected) {
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
        this.$logger.error(error.message, error);
        this.emitStatus(false, error.message);
      }
      this.loading = false;
    },
    async login() {
      try {
        this.oauth2Client = await CreateClient();
        this.properties.spreadsheets = await listAllSpreadsheets(this.oauth2Client);
      } catch (e) {
        this.$logger.error(e.message, e);
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
    },
  },
};
</script>

<style></style>
