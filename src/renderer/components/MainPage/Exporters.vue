<template>
  <el-collapse v-model="accordionActiveItem" accordion>
  <el-collapse-item name="jsonExporter">
    <div slot="title">
      <span>Export to Json</span>
      <el-tooltip
        effect="dark"
        :disabled="statuses.jsonExporter.lastMessage === null"
        :content="statuses.jsonExporter.lastMessage"
        placement="left"
      >
        <i
          class="header-icon"
          :class="iconClass(statuses.jsonExporter.success)"
        />
      </el-tooltip>
    </div>
    <json-exporter
      :message.sync="statuses.jsonExporter.lastMessage"
      :success.sync="statuses.jsonExporter.success" />
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
      statuses: {
        jsonExporter: {
          lastMessage: null,
          success: null,
        },
      },
    };
  },
  methods: {
    iconClass(success) {
      return {
        'el-icon-question': success === null,
        'el-icon-success': success,
        'el-icon-error': success === false,
      };
    },
  },
};
</script>

<style scoped>

i.header-icon.el-icon-error {
  color: red;
}

i.header-icon.el-icon-success {
  color: green;
}
</style>
