<template>
  <v-form
    ref="form"
    v-model="validated"
  >
    <v-container>
      <v-row justify="center">
        <v-col class="py-0">
          <v-text-field
            type="number"
            label="Days back from today to take"
            :rules="[required, positive]"
            :value="storeGlobalConfig.numDaysBack"
            @input="updateConfig($event, 'numDaysBack')"
          />
        </v-col>
        <v-col
          cols="auto"
          class="py-0"
        >
          <v-checkbox
            label="Show browser"
            :value="storeGlobalConfig.showBrowser"
            @change="updateConfig($event, 'showBrowser')"
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
import { mapGetters, mapActions } from 'vuex';
import { GLOBAL_CONFIG_GETTER, UPDATE_GLOBAL_CONFIG_ACTION } from '@/store/modules/Config';
import { VForm } from '@/types/vuetify';

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
    ...mapGetters({
      storeGlobalConfig: GLOBAL_CONFIG_GETTER
    }),
    readyToSave(): boolean {
      return this.validated && this.changed;
    },
    form(): VForm {
      return this.$refs.form as VForm;
    },
  },
  methods: {
    required: (value) => !!value || 'Required.',
    positive: (value: number) => value > 0 || 'Must be grater than 0',
    ...mapActions({
      updateGlobalConfig: UPDATE_GLOBAL_CONFIG_ACTION
    }),
    updateConfig(value, field): void {
      this.changed = true;
      this.globalConfig[field] = value;
    },
    submitForm() {
      if (this.form.validate()) {
        // TODO the arguments should be simple
        this.updateGlobalConfig({ ...this.storeGlobalConfig, ...this.globalConfig })
          .then(() => { this.changed = false; });
      }
    }
  }
});
</script>

<style>
</style>
