<template>
  <el-form>
    <el-form-item label="Folder to save">
      <el-input v-model="folder"/>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'JsonExporter',
  data() {
    return {
      folder: '',
    };
  },
};
</script>

<style>

</style>
