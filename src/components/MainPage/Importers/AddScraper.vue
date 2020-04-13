<template>
  <v-expansion-panel class="ma-1">
    <v-expansion-panel-header
      expand-icon="mdi-menu-down"
      :data-test="scraper.key"
    >
      {{ scraper.name }}
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-form
        ref="addScraperForm"
        :model="importerToAdd"
      >
        <v-container
          class="py-0"
        >
          <v-row
            v-for="(value, loginField) in importerToAdd.loginFields"
            :key="loginField"
          >
            <v-col
              cols="12"
              class="pa-0"
              :label="loginField"
            >
              <v-text-field
                v-model="importerToAdd.loginFields[loginField]"
                :label="loginField"
                :type="loginField == 'password' ? 'password' : 'text'"
                outlined
              />
            </v-col>
          </v-row>
          <v-row>
            <v-btn
              color="primary"
              :disabled="!isFormValid"
              @click="submitForm()"
            >
              Add
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-expansion-panel-content>
  </v-expansion-panel>
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
        const encrypted = await encryptProperty(
          this.importerToAdd,
          'loginFields',
        );
        this.addImporterAction(encrypted);
        this.resetForm();
        this.$emit('scraperAdded', true);
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

</style>
