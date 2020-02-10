<template>
  <el-collapse-item
    :title="scraper.name"
    :name="scraper.key"
    :data-test="scraper.key"
  >
    <el-form
      ref="addScraperForm"
      :model="importerToAdd"
    >
      <el-form-item
        v-for="(value, loginField) in importerToAdd.loginFields"
        :key="loginField"
        :label="loginField"
      >
        <el-input
          v-model="importerToAdd.loginFields[loginField]"
          :show-password="loginField == 'password'"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="!isFormValid"
          @click="submitForm()"
        >
          Add
        </el-button>
      </el-form-item>
    </el-form>
  </el-collapse-item>
</template>

<script>
import { mapActions } from 'vuex';
import { encryptProperty } from '@/modules/encryption/credentials';

function scraperToImporter(scraper) {
  const importer = { ...scraper, loginFields: {} };
  scraper.loginFields.forEach((element) => {
    importer.loginFields[element] = null;
  });
  return importer;
}

export default {
  props: {
    scraper: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      importerToAdd: scraperToImporter(this.scraper),
    };
  },
  computed: {
    isFormValid() {
      return Object.values(this.importerToAdd.loginFields).every(
        (key) => key && key.trim().length > 0,
      );
    },
  },
  methods: {
    async submitForm() {
      if (this.isFormValid) {
        const encrypted = await encryptProperty(this.importerToAdd, 'loginFields');
        this.addImporterAction(encrypted);
        this.resetForm();
      }
    },
    resetForm() {
      Object.assign(this.$data.importerToAdd, scraperToImporter(this.scraper));
    },
    ...mapActions(['addImporterAction']),
  },
};
</script>

<style scoped>
.add-scraper {
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
