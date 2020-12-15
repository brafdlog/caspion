<template>
  <div class="card-container">
    <v-card elevation="4">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title v-text="accountState.name" />
            <v-list-item-subtitle v-text="latestEventMessage" />
          </v-list-item-content>
          <v-list-item-icon class="status-indicator-wrapper">
            <account-card-status-indicator :account-status="accountState.status" />
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { AccountState } from '@/components/app/accountsState';
import AccountCardStatusIndicator from '@/components/shared/log/AccountCardStatusIndicator.vue';

export default defineComponent({
  components: {
    AccountCardStatusIndicator
  },
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
.status-indicator-wrapper {
  margin-right: 20px;
}
</style>
