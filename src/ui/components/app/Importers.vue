<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>
        Importers
      </v-toolbar-title>
    </v-toolbar>
    <v-expansion-panels>
      <v-expansion-panel
        v-for="importer in registeredImporters"
        :key="importer.id"
        class="ma-1"
      >
        <v-expansion-panel-header>
          {{ importer.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <importer
            :key="importer.id"
            :importer="importer"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      data-test="ToggleAddImporter"
    >
      <v-toolbar>
        <v-toolbar-title>
          Add new Importer
        </v-toolbar-title>
      </v-toolbar>
      <v-expansion-panels>
        <add-importer
          v-for="importer in availableImporters"
          :key="importer.key"
          :importer="importer"
          class="add-importer"
          @importerAdded="drawer = !drawer"
        />
      </v-expansion-panels>
    </v-navigation-drawer>
    <v-fab-transition>
      <v-btn
        color="primary"
        fab
        dark
        small
        absolute
        bottom
        left
        data-test="CollapseAddImporter"
        style="margin-bottom: 39px;"
        @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { inputVendors } from '@/backend';
import store from '@/ui/store';
import { defineComponent, ref, computed } from '@vue/composition-api';
import AddImporter from './importers/AddImporter';
import Importer from './importers/Importer';

export default defineComponent({
  components: { AddImporter, Importer },
  setup() {
    const drawer = ref(false);
    const availableImporters = computed(() => inputVendors);
    const registeredImporters = computed(() => store.getters.Config.importers);

    return { drawer, availableImporters, registeredImporters };
  }
});
</script>

<style scoped>
.v-expansion-panel-content >>> .v-expansion-panel-content__wrap {
  padding: 5px 10px;
}
</style>
