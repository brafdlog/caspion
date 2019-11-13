<template>
  <el-collapse v-model="accordionActiveItem" accordion>
  <el-collapse-item title="Export to Json" name="1">
    <json-exporter />
  </el-collapse-item>
</el-collapse>
</template>

<script>
import JsonExporter from './Exporters/JsonExporter';

export default {
  components: { JsonExporter },
  data() {
    return {
      accordionActiveItem: '',
    };
  },
};
</script>

<style>

</style>
