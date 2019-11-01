<template>
  <el-collapse-item
    :title="scraper.name"
    :name="scraper.key"
  >
    <el-form
      ref="addScraperForm"
      :model="scraperToAdd"
    >
      <el-form-item
        v-for="(value, loginField) in scraperToAdd.loginFields"
        :key="loginField"
        :label="loginField"
      >
        <el-input v-model="scraperToAdd.loginFields[loginField]" />
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
import { defaultEncryptProperty } from '../../../modules/credentials';

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
    console.log(scraperToImporter(this.scraper));
    return {
      scraperToAdd: scraperToImporter(this.scraper),
    };
  },
  computed: {
    isFormValid() {
      return Object.values(this.scraperToAdd.loginFields)
        .every((key) => key && key.trim().length > 0);
    },
    importerToEncrypt() {
      const encryptImporter = { ...this.scraperToAdd };
      encryptImporter[defaultEncryptProperty] = {
        loginFields: {
          ...this.scraperToAdd.loginFields,
        },
      };
      delete encryptImporter.loginFields;
      return encryptImporter;
    },
  },
  methods: {
    submitForm() {
      console.log(this.importerToEncrypt);
      if (this.isFormValid) {
        this.addImporterAction(this.importerToEncrypt);
        this.resetForm();
      } else {
        console.log('error submit!!');
      }
    },
    resetForm() {
      Object.assign(this.$data.scraperToAdd, scraperToImporter(this.scraper));
    },
    ...mapActions([
      'addImporterAction',
    ]),
  },
};
</script>

<style scoped>
.add-scraper {
    display: flex;
    flex-direction: column
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
