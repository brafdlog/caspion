<template>
  <el-form>
    <el-form-item label="Folder to save">
      <el-input v-model="properties.folder" />
    </el-form-item>
    <el-form-item label="File to save">
      <el-input v-model="properties.file" />
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
import path from 'path';
import { mapState, mapActions } from 'vuex';
import { transactionArrayToObject } from '../../../modules/transactions';
import { readFileToObject, writeFile } from '../../../modules/filesystem';

const name = 'JsonExporter';
const title = 'Export to Json file';

export default {
  name,
  title,
  data() {
    return {
      properties: {
        folder: path.join(this.$electron.remote.app.getPath('cache'), this.$electron.remote.app.getName()),
        file: 'transactions.json',
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
    submitForm() {
      this.loading = true;
      try {
        this.saveExporterProperties({ name, properties: this.properties });

        const filePath = path.join(this.properties.folder, this.properties.file);
        const savedObject = transactionArrayToObject(readFileToObject(filePath, []));
        const combineObject = { ...savedObject, ...this.transactions };
        writeFile(filePath, JSON.stringify(Object.values(combineObject), null, 4));
        this.emitStatus(true, `Your data saved in ${filePath}`);
      } catch (error) {
        this.$logger.error(error);
        this.emitStatus(false, error.message);
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>
