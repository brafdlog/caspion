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
          v-for="column in propertiesColumns"
          :key="column.name"
        >
          {{ column.title }}: {{ props.row[column.name] }}
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
import { formatters } from '../../modules/transactions';

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
    formatterWrapper(row, { property }, cellValue) {
      return formatters[property] ? formatters[property](cellValue) : cellValue;
    },
  },
};
</script>

<style>

</style>
