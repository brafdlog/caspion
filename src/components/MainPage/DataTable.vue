<template>
  <v-layout
    v-resize="onResize"
    fluid
  >
    <v-data-table
      style="width: 100%"
      :headers="headers"
      :items="transactionsWithId"
      :items-per-page="10"
      item-key="id"
      show-expand
      class="elevation-1"
      :height="contentHeight"
      fixed-header
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
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import { format, properties } from '../../modules/transactions';

const detailes = properties.map((prop) => ({
  text: prop.title,
  value: prop.name,
  ...prop,
}));

const tableFooterHeight = 59;


export default {
  name: 'DataTable',
  data() {
    return {
      contentHeight: 0,
    };
  },
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
    onResize() {
      this.contentHeight = window.innerHeight
                              - this.$vuetify.application.top
                              - this.$vuetify.application.footer - 4
                              - tableFooterHeight;
    },
  },
};
</script>

<style scoped>
.bold {
  font-weight: bold;
}
</style>
