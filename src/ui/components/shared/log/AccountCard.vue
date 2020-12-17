<template>
  <div class="card-container">
    <v-card elevation="4">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              v-if="accountMetadata.logo"
              :src="accountMetadata.logo"
            />
            <v-card-text
              v-else
              v-text="accountMetadata.companyName"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="accountMetadata.companyName" />
            <v-list-item-subtitle v-text="latestEventMessage" />
          </v-list-item-content>
          <v-dialog width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon>
                <v-icon
                  v-if="displayTheShowLogsIcon"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-information-outline
                </v-icon>
              </v-list-item-icon>
            </template>
            <v-card>
              <v-card-text class="log-details-text">
                {{ fullLog }}
              </v-card-text>
            </v-card>
          </v-dialog>

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
import { AccountState } from '@/ui/components/app/accountsState';
import { AccountStatus } from '@/originalBudgetTrackingApp/eventEmitters/EventEmitter';
import AccountCardStatusIndicator from '@/ui/components/shared/log/AccountCardStatusIndicator.vue';
import ACCOUNT_METADATA, { AccountMetadata } from '@/accountsMetadata';

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

    const displayTheShowLogsIcon = computed<boolean>(() => [AccountStatus.DONE, AccountStatus.ERROR].includes(props.accountState.status));
    const fullLog = computed<string>(() => props.accountState.events.map((event) => event.message.trim()).join('\n'));

    const accountMetadata: AccountMetadata = ACCOUNT_METADATA[props.accountState.id];
    return {
      latestEventMessage, accountMetadata, displayTheShowLogsIcon, fullLog
    };
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
.log-details-text {
  white-space: pre;
}
</style>
