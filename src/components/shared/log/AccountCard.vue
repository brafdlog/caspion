<template>
  <div class="card-container">
    <v-card elevation="4">
      <v-card-title> {{ accountState.name }}</v-card-title>
      <v-card-text> {{ latestEventMessage }}</v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { AccountState } from '@/components/app/AccountsState';

export default defineComponent({
  props: {
    accountState: {
      type: Object,
      required: true
    }
  },
  setup(props: { accountState: AccountState }) {
    const latestEventMessage = computed<string>(() => {
      const { events } = props.accountState;
      const latestEvent = events.length ? events[events.length - 1] : null;
      return latestEvent ? latestEvent.message : '';
    });
    return { latestEventMessage };
  }
});
</script>

<style scoped>
.card-container {
  margin: 20px;
  max-width: 600px;
}
</style>
