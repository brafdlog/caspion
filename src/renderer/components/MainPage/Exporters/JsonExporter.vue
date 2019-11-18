<template>
  <el-form>
    <el-form-item label="Folder to save">
      <el-input v-model="properties.folder" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm()">
        Export
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import path from 'path';
import { mapState, mapActions } from 'vuex';
const name = 'JsonExporter';

export default {
  name,
  data() {
    return {
      properties: {
        folder: path.join(this.$electron.remote.app.getPath('cache'), this.$electron.remote.app.getName()),
      },
    };
  },
  computed: {
    ...mapState({
      storeProperties: (state) => state.Exporters[name],
    }),
  },
  created() {
    this.properties = { ...this.properties, ...this.storeProperties };
  },
  methods: {
    ...mapActions([
      'saveExporterProperties',
    ]),
    submitForm() {
      this.saveExporterProperties({ name, properties: this.properties });
    },
  },
};
</script>

<style>

</style>
