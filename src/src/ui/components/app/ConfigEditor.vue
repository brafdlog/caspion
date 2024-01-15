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
            class="input-element"
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
            class="input-element"
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
import { defineComponent, ref, computed } from '@vue/composition-api';
import { VForm } from '@/types/vuetify';
import { required, positive } from '@/ui/components/shared/formValidations';
import store from '@/ui/store';
import { GlobalConfig } from '@/ui/store/modules/config';

export default defineComponent({
  setup() {
    const globalConfig = ref<GlobalConfig>(JSON.parse(JSON.stringify(store.getters.Config.globalConfig)));
    const validated = ref(true);
    const changed = ref(false);
    const vForm = ref<VForm>();

    const readyToSave = computed(() => validated.value && changed.value);

    const submitForm = () => {
      if (vForm.value?.validate()) {
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

<style scoped>
.input-element {
  min-width: 200px;
}
</style>
