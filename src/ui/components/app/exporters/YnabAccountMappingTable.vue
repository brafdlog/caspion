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
          v-for="(accountYnabPair, index) in accountToYnabArray"
          :key="index"
        >
          <td>
            <v-combobox
              v-model="accountYnabPair.account"
              :items="financialAccounts"
            />
          </td>
          <td>
            <v-combobox
              v-model="accountYnabPair.ynab"
              :items="ynabAccounts"
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
import { required } from '@/ui/components/shared/formValidations';
import {
  ref, defineComponent, PropType, computed
} from '@vue/composition-api';
import { cloneDeep } from 'lodash';
import { Account } from 'ynab';

export type MappingTable = {
  addItem: () => void
}

const { CreditCard, Checking, Savings } = Account.TypeEnum;

const RELEVANT_YNAB_ACCOUNT_TYPES = [CreditCard, Checking, Savings];

const mappingToArrayOfMappingObjects = (accountToYnab: Record<string, string>) => Object.keys(accountToYnab)
  .map((account) => ({ account, ynab: accountToYnab[account] }));
const arrayOfMappingObjectsToMapping = (mappingObjects: ConvertedType) => mappingObjects.reduce((mapping, { account, ynab }) => ({
  ...mapping,
  [account]: ynab
}), {} as Record<string, string>);

type ConvertedType = ReturnType<typeof mappingToArrayOfMappingObjects>
type ConvertedTypeElement = ConvertedType[number]

export default defineComponent({
  name: 'YnabAccountMappingTable',
  props: {
    value: {
      type: Object as PropType<Record<string, string>>,
      required: true
    },
    accountsInfo: {
      type: Object
    }
  },
  setup(props, { emit }) {
    const accountToYnabArray = ref(mappingToArrayOfMappingObjects(cloneDeep(props.value)));

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

    const ynabAccounts = computed(() => props.accountsInfo?.ynabAccounts
      ?.filter((ynabAccountInfo) => RELEVANT_YNAB_ACCOUNT_TYPES.includes(ynabAccountInfo.type))
      ?.map((ynabAccountInfo) => {
        return {
          text: ynabAccountInfo.name,
          value: ynabAccountInfo.id
        };
      }));
    const financialAccounts = computed(() => {
      const financialAccountsFromScraping = props.accountsInfo?.financialAccounts?.map((financialAccount) => {
        return {
          text: `${financialAccount.name} (${financialAccount.accountNumber})`,
          value: financialAccount.accountNumber
        };
      }) || [];
      const accountNumbersFromConfig = accountToYnabArray.value.map((accountYnabPair) => {
        return {
          value: accountYnabPair.account,
          text: accountYnabPair.account
        };
      });
      const merged = [
        ...(financialAccountsFromScraping),
        ...(accountNumbersFromConfig)
      ];
      return merged;
    });

    return {
      accountToYnabArray,
      onInput,
      deleteAccountMapping,
      addItem,
      rules: {
        required
      },
      ynabAccounts,
      financialAccounts
    };
  }
});
</script>

<style scoped>

</style>
