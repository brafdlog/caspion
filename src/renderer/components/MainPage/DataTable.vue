<template>
  <el-table
    :data="transactions"
    :default-sort="{prop: 'date', order: 'descending'}"
    border
    stripe
  >
    <el-table-column type="expand">
      <template slot-scope="props">
        <p
          v-for="column in filterEmptyColumn(props)"
          :key="column.name"
        >
          <span class="bold">{{ column.title }}: </span>
          {{ format(column.name, props.row[column.name]) }}
        </p>
      </template>
    </el-table-column>
    <el-table-column
      v-for="column in tableColumns"
      :key="column.name"
      :prop="column.name"
      :label="column.title"
      :formatter="formatterWrapper"
      sortable
    />
  </el-table>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { format } from '../../modules/transactions';

export default {
  name: 'DataTable',
  computed: {
    ...mapState({
      transactions: (state) => state.Transactions.transactions,
    }),
    ...mapGetters([
      'tableColumns',
      'propertiesColumns',
    ]),
  },
  methods: {
    format: (property, value) => format(property, value),
    formatterWrapper(row, { property }, cellValue) {
      return format(property, cellValue);
    },
    filterEmptyColumn(props) {
      return this.propertiesColumns.filter((col) => props.row[col.name]);
    },
  },
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
