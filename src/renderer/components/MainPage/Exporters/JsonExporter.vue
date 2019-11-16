<template>
  <el-form>
    <el-form-item label="Folder to save">
      <el-input v-model="folder"/>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

const name = 'JsonExporter';

export default {
  name,
  computed: {
    ...mapState({
      properties: state => state.Exporters[name]
    }),
    folder: {
      get() {
        return this.$store
      },
    },
  },
};
</script>

<style>

</style>
