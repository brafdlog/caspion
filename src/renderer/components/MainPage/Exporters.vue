<template>
  <el-collapse
    v-model="accordionActiveItem"
    accordion
  >
    <el-collapse-item
      v-for="comp in exportersComponents"
      :key="comp.name"
      :name="comp.name"
    >
      <div slot="title">
        <span>{{ comp.title }}</span>
        <el-tooltip
          effect="dark"
          :disabled="statuses[comp.name].lastMessage === null"
          :content="statuses[comp.name].lastMessage"
          placement="left"
        >
          <i
            class="header-icon"
            :class="iconClass(statuses[comp.name].success)"
          />
        </el-tooltip>
      </div>
      <component
        :is="comp.name"
        :message.sync="statuses[comp.name].lastMessage"
        :success.sync="statuses[comp.name].success"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import JsonExporter from './Exporters/JsonExporter';
import SpreadsheetExporter from './Exporters/SpreadsheetExporter';

const exportersComponents = {
  JsonExporter,
  SpreadsheetExporter,
};

const statuses = {};
Object.keys(exportersComponents).forEach((key) => {
  statuses[key] = {
    lastMessage: null,
    success: null,
  };
});

export default {
  components: { ...exportersComponents },
  data() {
    return {
      accordionActiveItem: '',
      exportersComponents,
      statuses,
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
