<template>
  <el-form>
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
        console.error(error);
        this.emitStatus(false, error.message);
      }
      this.loading = false;
    },
  },
};
</script>

<style>

</style>
