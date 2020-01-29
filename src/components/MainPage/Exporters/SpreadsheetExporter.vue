<template>
  <el-form>
    <el-select
      v-if="isLogin"
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
    <el-button
      v-else
      type="primary"
      @click="login()"
    >
      Login to Google
    </el-button>
    <el-form-item>
      <el-button
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
import saveTransactionsToGoogleSheets, { listAllSpreadsheets } from '@/modules/spreadsheet/spreadsheet';

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
        this.saveExporterProperties({ name, properties: this.properties });
        const result = await saveTransactionsToGoogleSheets(
          this.properties.fileUrl,
          this.transactions,
        );
        this.emitStatus(
          true,
          `There were ${result.before} transactions, 
            we uploaded ${result.new} transactions and now there are ${result.combine} transactions.`,
        );
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
  },
};
</script>

<style></style>
