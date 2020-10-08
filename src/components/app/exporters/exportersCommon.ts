import { cloneDeep } from 'lodash';
import { computed, reactive, ref } from '@vue/composition-api';
import { VForm } from '@/types/vuetify';
import store from '@/store';
import { OutputVendorName } from '@/originalBudgetTrackingApp/commonTypes';

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
