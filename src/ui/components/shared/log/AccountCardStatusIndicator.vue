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
  <v-icon
    v-else-if="accountStatus === accountStatusEnum.ERROR"
    color="red"
  >
    mdi-alert
  </v-icon>
  <v-icon
    v-else-if="accountStatus === accountStatusEnum.PENDING"
    color="yellow darken-2"
  >
    mdi-timer-sand
  </v-icon>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { AccountStatus } from '@/backend/eventEmitters/EventEmitter';

export default defineComponent({
  props: {
    accountStatus: {
      required: true
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
