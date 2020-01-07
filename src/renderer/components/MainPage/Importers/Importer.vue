<template>
  <el-card
    v-if="decryptedImporter"
    :body-style="{ padding: '0px' }"
  >
    <el-collapse-item :name="decryptedImporter.key">
      <div slot="title">
        <span>{{ decryptedImporter.name }}</span>
        <el-tooltip
          effect="dark"
          :disabled="lastMessage === null"
          :content="lastMessage"
          placement="right"
        >
          <i
            class="header-icon"
            :class="iconClass"
          />
        </el-tooltip>
      </div>
      <div>
        <el-checkbox v-model="showBrowser">
          Show browser
        </el-checkbox>
      </div>
      <div
        v-for="(value, loginField) in decryptedImporter.loginFields"
        :key="loginField"
      >
        {{ loginField }}: {{ loginField != 'password' ? value : '*'.repeat(value.length) }}
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
      />
    </el-collapse-item>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex';
import { MessageBox } from 'element-ui';
import scrape from '../../../modules/scrapers';
import { decryptProperty } from '../../../modules/encryption/credentials';

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
      success: null,
      lastMessage: null,
      showBrowser: false,
      decryptedImporter: null,
      percentage: 0,
    };
  },
  computed: {
    iconClass() {
      return {
        'el-icon-question': this.success === null,
        'el-icon-success': this.success,
        'el-icon-error': this.success === false,
      };
    },
  },
  created() {
    decryptProperty(this.importer, 'loginFields')
      .then((decrypted) => {
        this.decryptedImporter = decrypted;
      });
  },
  methods: {
    async scrape() {
      let success;
      let errorMessage;

      this.importing = true;
      this.onProgress({ percent: 0 });
      try {
        this.$logger.info('Request to import');
        const result = await scrape(
          this.$electron.remote.app.getPath('cache'),
          this.decryptedImporter.key,
          this.decryptedImporter.loginFields,
          this.showBrowser,
          this.$logger,
          this.onProgress,
        );
        success = result.success;
        errorMessage = result.errorMessage || result.errorType;
        if (result.success) {
          result.accounts.forEach((account) => {
            this.addTransactionsAction(account);
          });
          this.onProgress({ percent: 0.9 });
        }
        this.$logger.info(`Success: ${success}. Error Message: ${errorMessage}`);
      } catch (error) {
        this.$logger.error(`message: ${error.message}. Error Code:${error.code}`);
        this.$logger.verbose(error.stack);
        success = false;
        errorMessage = error.message;
      } finally {
        this.onProgress({ percent: 1 });
        this.updateStatus(success, errorMessage);
      }
    },
    onProgress({ percent }) {
      this.percentage = Math.floor(percent * 100);
    },
    updateStatus(success, errorMessage) {
      this.importing = false;
      this.success = success;
      if (success === false) {
        this.lastMessage = errorMessage || 'UNKNOWN_ERROR';
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
      this.removeImporterAction(this.decryptedImporter.key);
    },
    ...mapActions(['removeImporterAction', 'addTransactionsAction']),
  },
};
</script>

<style scoped>

i.header-icon.el-icon-error {
  color: red;
}

i.header-icon.el-icon-success {
  color: green;
}
</style>
