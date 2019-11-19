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
import { mapState, mapActions, mapGetters } from 'vuex';
import { saveToFile } from '../../../modules/transactions';

const name = 'JsonExporter';

export default {
  name,
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
    }),
    ...mapGetters([
      'transactionsArray',
    ]),
  },
  created() {
    this.properties = { ...this.properties, ...this.storeProperties };
  },
  methods: {
    ...mapActions([
      'saveExporterProperties',
    ]),
    submitForm() {
      this.loading = true;
      this.saveExporterProperties({ name, properties: this.properties });
      const filePath = path.join(this.properties.folder, this.properties.file);
      saveToFile(this.transactionsArray, filePath, (err) => {
        this.loading = false;
        if (err) {
          console.error(err);
        }
      });
    },
  },
};
</script>

<style>

</style>
