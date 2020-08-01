<template>
  <v-card>
    <v-checkbox
      v-model="showBrowser"
      label="Show browser"
    />
    <div
      v-for="(value, credentialFieldName) in importer.loginFields"
      :key="credentialFieldName"
    >
      {{ credentialFieldName }}:
      {{ credentialFieldName != "password" ? value : "*".repeat(value.length) }}
    </div>
    <v-btn
      color="primary"
      class="mx-1"
      :loading="importing"
      @click="scrape()"
    >
      Import
    </v-btn>
    <v-btn
      color="error"
      dark
      class="mx-1"
      @click="deleteDialog = true"
    >
      <v-icon>mdi-delete</v-icon>
      Delete
    </v-btn>
    <DeleteImporterDialog
      v-model="deleteDialog"
      @confirm="DeleteImporter"
    />
    <v-progress-linear
      v-show="importing"
      v-model="percentage"
      height="25"
      reactive
    >
      <template v-slot="{ value }">
        <strong>{{ value }}%</strong>
      </template>
    </v-progress-linear>
    <div v-show="importing">
      {{ step }}
    </div>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import { remote } from 'electron';
import { REMOVE_IMPORTER_ACTION } from '@/store/modules/Config';
import { scrape } from '@/modules/scrapers';
import DeleteImporterDialog from '@/components/MainPage/Importers/DeleteImporterDialog';

export default {
  components: {
    DeleteImporterDialog,
  },
  props: {
    importer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      importing: false,
      showBrowser: false,
      percentage: 0,
      step: '',
      status: undefined,
      deleteDialog: false,
    };
  },
  methods: {
    async scrape() {
      this.importing = true;
      this.onProgress({ percent: 0, message: `Request to import ${this.importer.key}` });
      try {
        const result = await scrape(
          remote.app.getPath('cache'),
          this.importer.key,
          this.importer.loginFields,
          this.showBrowser,
          this.onProgress,
          this.$logger,
        );
        if (result.success) {
          const message = result.accounts
            .map((account) => `${account.accountNumber} with ${account.txns.length}`).join();
          this.onProgress({ percent: 1, message });
          result.accounts.forEach((account) => {
            this.addTransactionsAction(account);
          });
        } else {
          const message = result.errorMessage || result.errorType;
          this.onProgress({ percent: 1, message, error: message });
        }
      } catch (error) {
        this.onProgress({ percent: 1, message: error.message, error });
      }
    },
    onProgress({ percent, message, error }) {
      if (percent === undefined) throw new Error('You must to set \'percent\' value for progress');
      this.percentage = Math.floor(percent * 100);
      if (message) {
        this.step = message;
        this.$logger.info(message);
      }
      if (error) {
        this.$logger.error(error.message);
        if (error.stack) this.$logger.verbose(error.stack);
        this.status = 'exception';
      }
      if (percent >= 1) {
        this.importing = false;
        const success = this.status !== 'exception' && !error;
        this.status = success ? 'success' : 'exception';
        const status = {
          success,
          lastMessage: this.step,
        };
        this.updateImporterStatus({ id: this.importer.id, status });
      }
    },
    DeleteImporter() {
      this.deleteDialog = false;
      this[REMOVE_IMPORTER_ACTION](this.importer.id);
    },
    ...mapActions([
      REMOVE_IMPORTER_ACTION,
      'addTransactionsAction',
      'updateImporterStatus',
    ]),
  },
};
</script>

<style scoped>
.v-input--selection-controls {
      margin-top: 0px;
      padding-top: 0px;
}
.v-input__slot {
  margin-bottom: 0px;
}
.v-messages {
  flex: 1 1 auto;
  font-size: 12px;
  min-height: 0px;
  min-width: 1px;
  position: relative;
}
</style>
