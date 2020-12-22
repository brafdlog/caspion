<template>
  <v-expansion-panel class="ma-1">
    <v-expansion-panel-header
      expand-icon="mdi-menu-down"
      :data-test="importer.key"
    >
      {{ importer.name }}
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
            v-for="(value, credentialFieldName) in importerToAdd.loginFields"
            :key="credentialFieldName"
          >
            <v-col
              cols="12"
              class="pa-0"
              :label="credentialFieldName"
            >
              <v-text-field
                v-model="importerToAdd.loginFields[credentialFieldName]"
                :label="credentialFieldName"
                :type="credentialFieldName == 'password' ? 'password' : 'text'"
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
import store from '@/ui/store';

function initData(importerProp) {
  const importerToAdd = { active: true, ...importerProp, loginFields: {} };
  importerProp.loginFields.forEach((element) => {
    importerToAdd.loginFields[element] = null;
  });
  return { importerToAdd };
}

export default {
  props: {
    importer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return initData(this.importer);
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
        this.addImporter(this.importerToAdd);
        this.resetForm();
        this.$emit('importerAdded', true);
      }
    },
    resetForm() {
      Object.assign(this.$data, initData(this.importer));
    },
    addImporter: store.dispatch.Config.addImporter
  },
};
</script>

<style scoped>

</style>
