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
      :show-text="step.startsWith('Step 1')"
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
import { ipcRenderer, remote } from 'electron';
import { decryptProperty } from '@/service/encryption/credentials.service';

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
    };
  },
  created() {
    this.decryptedImporter = decryptProperty(this.importer, 'loginFields').then((decrypted) => {
      this.$logger.info(`Importer '${this.importer.name}' with id:${this.importer.id} `
        + `decrypted with ${Object.keys(decrypted.loginFields).length} fields`);
      this.decryptedImporter = decrypted;
    });

    ipcRenderer.on('onProgress-message', (event, percent, step) => {
      this.onProgress(percent, step);
    });
  },
  methods: {
    async scrape() {
      let success;
      let errorMessage;

      this.importing = true;
      this.onProgress(0, '');
      try {
        this.$logger.info('Request to import');
        ipcRenderer.send('scrape',
          remote.app.getPath('cache'),
          this.decryptedImporter.key,
          this.decryptedImporter.loginFields,
          this.showBrowser);
        ipcRenderer.on('scrape-reply', (event, result) => {
          this.$logger.info(result);
          success = result.success;
          errorMessage = result.errorMessage || result.errorType;
          if (result.success) {
            result.accounts.forEach((account) => {
              this.addTransactionsAction(account);
            });
          }
          this.updateStatus(success, errorMessage);
          this.$logger.info(
            `Success: ${success}. Error Message: ${errorMessage}`,
          );
        });
      } catch (error) {
        this.onProgress(1, 'Error!');
        this.$logger.error(
          `message: ${error.message}. Error Code:${error.code}`,
        );
        this.$logger.verbose(error.stack);
        success = false;
        errorMessage = error.message;
      }
    },
    onProgress(percent, step) {
      this.percentage = Math.floor(percent * 100);
      if (step) {
        this.step = step;
      }
    },
    updateStatus(success, errorMessage) {
      this.importing = false;
      const status = {
        success,
        lastMessage: null,
      };
      if (success === false) {
        status.lastMessage = errorMessage || 'UNKNOWN_ERROR';
      }
      this.updateImporterStatus({ id: this.importer.id, status });
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

<style scoped></style>
