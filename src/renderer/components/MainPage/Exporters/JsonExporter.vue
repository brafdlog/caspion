<template>
  <el-form>
    <el-form-item label="Folder to save">
      <el-input v-model="properties.folder" />
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from 'vuex';
const name = 'JsonExporter';

export default {
  name,
  data() {
    return {
      defaultProperties: {
        folder: this.$electron.remote.app.getName(),
      },
    };
  },
  computed: {
    ...mapState({
      properties(state) {
        return Object.assign(this.defaultProperties, state.Exporters[name]);
      },
    }),
  },
};
</script>

<style>

</style>
