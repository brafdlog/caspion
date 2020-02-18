<template>
  <div v-if="decryptedImporter">
    <div>
      <el-checkbox v-model="showBrowser">
        Show browser
      </el-checkbox>
    </div>
    <div
      v-for="(value, loginField) in decryptedImporter.loginFields"
      :key="loginField"
    >
      {{ loginField }}:
      {{ loginField != "password" ? value : "*".repeat(value.length) }}
    </div>
    <el-button
      type="primary"
      :loading="importing"
      @click="scrape()"
    >
      Import
    </el-button>
    <el-button
      type="danger"
      icon="el-icon-delete"
      :disabled="importing"
      @click="promptDelete()"
    >
      Delete
    </el-button>
    <el-progress
      v-show="importing"
      :percentage="percentage"
      :status="status"
      class="progress-bar"
    />
    <div v-show="importing">
      {{ step }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { MessageBox } from 'element-ui';
// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';
import { decryptProperty } from '@/modules/encryption/credentials';
import { scrape } from '@/modules/scrapers';

export default {
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
      decryptedImporter: null,
      percentage: 0,
      step: '',
      status: undefined,
    };
  },
  created() {
    this.decryptedImporter = decryptProperty(this.importer, 'loginFields').then(
      (decrypted) => {
        this.$logger.info(
          `Importer '${this.importer.name}' with id:${this.importer.id} `
            + `decrypted with ${Object.keys(decrypted.loginFields).length} fields`,
        );
        this.decryptedImporter = decrypted;
      },
    );
  },
  methods: {
    async scrape() {
      this.importing = true;
      this.onProgress({ percent: 0, message: `Request to import ${this.decryptedImporter.key}` });
      try {
        const result = await scrape(
          remote.app.getPath('cache'),
          this.decryptedImporter.key,
          this.decryptedImporter.loginFields,
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
    async promptDelete() {
      await MessageBox.confirm(
        'This will permanently delete the importer. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      );
      this.removeImporterAction(this.decryptedImporter.id);
    },
    ...mapActions([
      'removeImporterAction',
      'addTransactionsAction',
      'updateImporterStatus',
    ]),
  },
};
</script>

<style scoped>
.progress-bar {
  padding-top: 10px;
}
</style>
