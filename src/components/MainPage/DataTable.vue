<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="transactionsWithId"
      :items-per-page="10"
      item-key="id"
      show-expand
      class="elevation-1"
    >
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length">
          <ul>
            <li
              v-for="field in filterEmptyFields(item)"
              :key="field.value"
            >
              <span class="bold">{{ field.text }}: </span>
              {{ format(field.value, item[field.value]) }}
            </li>
          </ul>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { format, properties } from '../../modules/transactions';

const detailes = properties.map((prop) => ({
  text: prop.title,
  value: prop.name,
  ...prop,
}));

export default {
  name: 'DataTable',
  computed: {
    headers: () => detailes.filter((detail) => detail.column),
    expanded: () => detailes.filter((detail) => !detail.column),
    ...mapGetters({
      transactions: 'transactionsArray',
    }),
    transactionsWithId() {
      return this.transactions.map((txn, id) => ({ id, ...txn }));
    },
  },
  methods: {
    format: (property, value) => format(property, value),
    formatterWrapper(row, { property }, cellValue) {
      return format(property, cellValue);
    },
    filterEmptyFields(item) {
      return this.expanded.filter((col) => item[col.name]);
    },
  },
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
