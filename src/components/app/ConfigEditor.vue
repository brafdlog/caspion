<template>
  <v-form
    ref="form"
    v-model="validated"
  >
    <v-container>
      <v-row justify="center">
        <v-col class="py-0">
          <v-text-field
            v-model="globalConfig.numDaysBack"
            type="number"
            label="Days back from today to take"
            :rules="[required, positive]"
            @change="changed = true"
          />
        </v-col>
        <v-col
          cols="auto"
          class="py-0"
        >
          <v-checkbox
            v-model="globalConfig.showBrowser"
            label="Show browser"
            @change="changed = true"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-btn
      color="primary"
      :disabled="!readyToSave"
      @click="submitForm()"
    >
      Save
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { VForm } from '@/types/vuetify';
import store from '@/store';

export default Vue.extend({
  name: 'ConfigEditor',
  data() {
    return {
      globalConfig: {},
      validated: true,
      changed: false,
    };
  },
  computed: {
    storeGlobalConfig: () => store.getters.Config.globalConfig,
    readyToSave(): boolean {
      return this.validated && this.changed;
    },
    form(): VForm {
      return this.$refs.form as VForm;
    },
  },
  created() {
    this.reset();
  },
  methods: {
    required: (value) => !!value || 'Required.',
    positive: (value: number) => value > 0 || 'Must be grater than 0',
    updateGlobalConfig: store.dispatch.Config.updateGlobalConfig,
    reset() {
      this.globalConfig = JSON.parse(JSON.stringify(this.storeGlobalConfig));
      this.changed = false;
    },
    submitForm() {
      if (this.form.validate()) {
        // TODO fix type in the next PR
        this.updateGlobalConfig(this.globalConfig as any)
          .then(this.reset);
      }
    }
  }
});
</script>

<style>
</style>
