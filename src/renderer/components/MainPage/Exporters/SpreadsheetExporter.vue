<template>
  <el-form>
    <el-link
      type="primary"
      href="https://github.com/baruchiro/israeli-bank-scrapers-desktop/blob/master/docs/share-spreadsheet.md"
      target="_blank"
      @click.prevent="openExternalBrowser">Creating Sharing Link</el-link>
    <el-form-item label="Spreadsheet Sharing Link">
      <el-input v-model="properties.fileUrl" />
    </el-form-item>
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
import saveTransactionsToGoogleSheets from '../../../modules/spreadsheet';

const name = 'SpreadsheetExporter';
const title = 'Export to Google Spreadsheet';

export default {
  name,
  title,
  data() {
    return {
      properties: {
        fileUrl: '',
      },
      loading: false,
    };
  },
  computed: {
    ...mapState({
      storeProperties: (state) => state.Exporters[name],
      transactions: (state) => state.Transactions.transactions,
    }),
  },
  created() {
    this.properties = { ...this.properties, ...this.storeProperties };
  },
  methods: {
    ...mapActions([
      'saveExporterProperties',
    ]),
    emitStatus(success, message) {
      this.$emit('update:success', success);
      this.$emit('update:message', message);
    },
    async submitForm() {
      this.loading = true;
      try {
        this.saveExporterProperties({ name, properties: this.properties });
        const result = await saveTransactionsToGoogleSheets(
          this.properties.fileUrl, this.transactions,
        );
        this.emitStatus(true, `There were ${result.before} transactions, 
        we uploaded ${result.new} transactions and now there are ${result.combine} transactions.`);
      } catch (error) {
        this.$logger.error(error);
        this.emitStatus(false, error.message);
      }
      this.loading = false;
    },
    openExternalBrowser(e) {
      this.$electron.remote.shell.openExternal(e.target.href);
    },
  },
};
</script>

<style>

</style>
