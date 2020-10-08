import { OutputVendorName } from '@/originalBudgetTrackingApp/commonTypes';
import store from '@/store';
import { VForm } from '@/types/vuetify';
import { computed, reactive, ref } from '@vue/composition-api';
import { cloneDeep } from 'lodash';

export function setupExporterConfigForm<T extends OutputVendorName>(exporterName: T) {
  const vForm = ref<VForm>();

  const exporter = reactive(cloneDeep(store.getters.Config.getExporter(exporterName)));

  const validated = ref(true);
  const changed = ref(false);
  const readyToSave = computed(() => validated && changed);
  const submit = async () => {
    if (vForm.value?.validate()) {
      await store.dispatch.Config.updateExporter({ name: exporterName, exporter });
      changed.value = false;
    }
  };

  return {
    validated, changed, readyToSave, submit, exporter, vForm
  };
}