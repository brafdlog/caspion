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
              v-model="keyVal.key"
              full-width
              dense
              :rules="[rules.required]"
              @change="input"
            />
          </td>
          <td>
            <v-text-field
              v-model="keyVal.value"
              full-width
              dense
              :rules="[rules.required]"
              @change="input"
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

const objToArrayOfKeyValueArray = (obj: Record<string, string>) => Object.keys(obj).map((key) => ({ key, value: obj[key] }));
type ConvertedType = ReturnType<typeof objToArrayOfKeyValueArray>
type ConvertedTypeElement = ConvertedType[number]
const arrayOfKeyValueArrayToObj = (arr: ConvertedType) => arr.reduce((obj, { key, value }) => ({
  ...obj,
  [key]: value
}), {} as Record<string, string>);

export default Vue.extend({
  name: 'YnabAccountMappingTable',
  props: {
    value: {
      type: Object as PropType<Record<string, string>>,
      required: true
    }
  },
  setup(props, { emit }) {
    const accountToYnabArray = ref(objToArrayOfKeyValueArray(cloneDeep(props.value as Record<string, string>)));

    const input = () => {
      emit('change');
      emit('input', arrayOfKeyValueArrayToObj(accountToYnabArray.value));
    };
    const deleteAccountMapping = (index: number) => {
      accountToYnabArray.value.splice(index, 1);
      input();
    };
    const addItem = () => {
      accountToYnabArray.value.push({ key: '', value: '' });
      input();
    };

    return {
      accountToYnabArray,
      input,
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
