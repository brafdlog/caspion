<template>
<el-table
  :data="transactions"
  border
  stripe>
  <el-table-column
    v-for="(value, prop) in columns"
    :key="prop"
    :prop="prop"
    :label="value"
    sortable>
  </el-table-column>
</el-table>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DataTable',
  computed: mapState({
    transactions: (state) => state.Transactions.transactions,
    columns: (state) => state.Transactions.defaultColumns,
  }),
};
</script>

<style>

</style>
