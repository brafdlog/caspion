<template>
  <v-form
    ref="vForm"
    v-model="validated"
  >
    <v-checkbox
      v-model="exporter.active"
      label="Active"
      hide-details="auto"
      @change="changed = true"
    />
    <v-text-field
      v-model="exporter.options.accessToken"
      type="password"
      label="Access Token"
      outlined
    />
    <v-btn
      color="primary"
      :disabled="!readyToSave.value"
      @click="submit()"
    >
      Save
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { computed, ref, reactive } from '@vue/composition-api';
import store from '@/store';
import { OutputVendorsConfig } from '@/originalBudgetTrackingApp/configManager/configManager';
import { VForm } from '@/types/vuetify';

const exporterName = 'ynab';

export default Vue.extend({
  name: 'YnabExporter',

  setup() {
    const vForm = ref<VForm>();

    const exporter = reactive(JSON.parse(JSON.stringify(store.getters.Config.getExporter(exporterName))) as OutputVendorsConfig<typeof exporterName>);

    const validated = ref(true);
    const changed = ref(false);
    const readyToSave = computed(() => validated && changed);
    const submit = () => {
      if (vForm.value?.validate()) {
        store.dispatch.Config.updateExporter({ name: exporterName, exporter })
          .then(() => { changed.value = false; });
      }
    };

    return {
      validated, changed, readyToSave, submit, exporter, vForm
    };
  }
});
</script>

<style scoped>

</style>
