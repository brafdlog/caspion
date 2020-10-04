<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th>Account number</th>
          <th>Ynab account id</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="accountNumberAndId in accountNumbersToYnabAccountIds"
          :key="accountNumberAndId.accountNumber"
        >
          <td>
            <v-text-field
              v-model="accountNumberAndId.accountNumber"
              full-width
              dense
              :rules="[rules.required]"
              @keydown="$emit('mappingChanged')"
            />
          </td>
          <td>
            <v-text-field
              v-model="accountNumberAndId.ynabAccountId"
              full-width
              dense
              :rules="[rules.required]"
              @keydown="$emit('mappingChanged')"
            />
          </td>
          <td>
            <v-btn
              icon
              color="red"
              @click="deleteAccountMapping(accountNumberAndId.accountNumber)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import Vue from 'vue';
import { required } from '@/components/shared/formValidations';

export default Vue.extend({
  name: 'YnabAccountMappingTable',
  props: {
    accountNumbersToYnabAccountIds: {
      type: Array,
      required: true
    }
  },
  setup(_, { emit }) {
    return {
      deleteAccountMapping(accountNumberToDelete) {
        emit('deleteAccountMapping', accountNumberToDelete);
      },
      addAccountMapping() {
        emit('addAccountMapping');
      },
      rules: {
        required
      }
    };
  }
});
</script>

<style scoped>

</style>
