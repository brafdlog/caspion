<template>
  <v-form
    ref="vForm"
    v-model="validated"
  >
    <v-container>
      <v-row justify="center">
        <v-col class="py-0">
          <v-text-field
            v-model="globalConfig.numDaysBack"
            type="number"
            label="Days back from today to take"
            :rules="[rules.required, rules.positive]"
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
import { VForm } from '@/types/vuetify';
import { required, positive } from '@/components/shared/formValidations';
import store from '@/store';
import { defineComponent, ref, computed } from '@vue/composition-api';
import { GlobalConfig } from '@/store/modules/config';

export default defineComponent({
  setup() {
    const globalConfig = ref<GlobalConfig>(JSON.parse(JSON.stringify(store.getters.Config.globalConfig)));
    const validated = ref(true);
    const changed = ref(false);
    const vForm = ref<VForm>();

    const readyToSave = computed(() => validated.value && changed.value);

    const submitForm = () => {
      debugger;
      if (vForm.value?.validate()) {
        debugger;
        store.dispatch.Config.updateGlobalConfig(globalConfig.value)
          .then(() => {
            globalConfig.value = JSON.parse(JSON.stringify(store.getters.Config.globalConfig));
            changed.value = false;
          });
      }
    };

    return {
      vForm,
      validated,
      changed,
      globalConfig,
      readyToSave,
      submitForm,
      rules: {
        required, positive
      }
    };
  },
});
</script>

<style>
</style>
