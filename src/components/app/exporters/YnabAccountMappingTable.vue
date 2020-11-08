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
          v-for="(keyVal, index) in accountToYnabArray"
          :key="index"
        >
          <td>
            <v-text-field
              v-model="keyVal.account"
              full-width
              dense
              :rules="[rules.required]"
              @input="onInput"
            />
          </td>
          <td>
            <v-text-field
              v-model="keyVal.ynab"
              full-width
              dense
              :rules="[rules.required]"
              @input="onInput"
            />
          </td>
          <td>
            <v-btn
              icon
              color="red"
              @click="deleteAccountMapping(index)"
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
import Vue, { PropType } from 'vue';
import { required } from '@/components/shared/formValidations';
import { ref } from '@vue/composition-api';
import { cloneDeep } from 'lodash';

export type MappingTable = {
  addItem: () => void
}

const mappingToArrayOfMappingObjects = (accountToYnab: Record<string, string>) => Object.keys(accountToYnab)
  .map((account) => ({ account, ynab: accountToYnab[account] }));
const arrayOfMappingObjectsToMapping = (mappingObjects: ConvertedType) => mappingObjects.reduce((mapping, { account, ynab }) => ({
  ...mapping,
  [account]: ynab
}), {} as Record<string, string>);

type ConvertedType = ReturnType<typeof mappingToArrayOfMappingObjects>
type ConvertedTypeElement = ConvertedType[number]

export default Vue.extend({
  name: 'YnabAccountMappingTable',
  props: {
    value: {
      type: Object as PropType<Record<string, string>>,
      required: true
    }
  },
  setup(props, { emit }) {
    const accountToYnabArray = ref(mappingToArrayOfMappingObjects(cloneDeep(props.value as Record<string, string>)));

    const onInput = () => {
      emit('change');
      emit('input', arrayOfMappingObjectsToMapping(accountToYnabArray.value));
    };
    const deleteAccountMapping = (index: number) => {
      accountToYnabArray.value.splice(index, 1);
      onInput();
    };
    const addItem = () => {
      accountToYnabArray.value.push({ account: '', ynab: '' });
      onInput();
    };

    return {
      accountToYnabArray,
      onInput,
      deleteAccountMapping,
      addItem,
      rules: {
        required
      }
    };
  }
});
</script>

<style scoped>

</style>
