<template>
  <v-progress-circular
    v-if="accountStatus === accountStatusEnum.IN_PROGRESS"
    indeterminate
    color="primary"
    size="25"
  />
  <v-icon
    v-else-if="accountStatus === accountStatusEnum.DONE"
    color="green"
  >
    mdi-check
  </v-icon>

  <v-dialog
    v-else-if="accountStatus === accountStatusEnum.ERROR"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-icon
        v-bind="attrs"
        color="red"
        v-on="on"
      >
        mdi-alert
      </v-icon>
    </template>
    <v-card>
      <v-card-title class="headline red lighten-2">
        Error
      </v-card-title>
      <v-card-text class="general-error-text subtitle-1">
        {{ errorMessage }}
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-icon
    v-else-if="accountStatus === accountStatusEnum.PENDING"
    color="yellow darken-2"
  >
    mdi-timer-sand
  </v-icon>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { AccountStatus } from '@/backend/eventEmitters/EventEmitter';

export default defineComponent({
  props: {
    accountStatus: {
      required: true,
      type: Object as PropType<AccountStatus>
    },
    errorMessage: {
      type: String,
      required: false,
      default: 'Unknown Error'
    }
  },
  setup() {
    return {
      accountStatusEnum: AccountStatus
    };
  }
});
</script>

<style scoped>

</style>
