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
      sortable
    />
  </el-table>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

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
};
</script>

<style>

</style>
