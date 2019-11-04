<template>
<el-table
  :data="transactions"
  :default-sort="{prop: 'date', order: 'descending'}"
  border
  stripe>
  <el-table-column type="expand">
    <template slot-scope="props">
      <p v-for="(value, prop) in propertiesColumns" :key="prop">
        {{ value }}: {{ props.row[prop] }}
      </p>
    </template>
  </el-table-column>
  <el-table-column
    v-for="(value, prop) in tableColumns"
    :key="prop"
    :prop="prop"
    :label="value"
    sortable>
  </el-table-column>
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
