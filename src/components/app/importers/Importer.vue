<template>
  <div>
    <div
      v-for="(value, credentialFieldName) in importer.loginFields"
      :key="credentialFieldName"
    >
      {{ credentialFieldName }}:
      {{ credentialFieldName != "password" ? value : "*".repeat(value.length) }}
    </div>
    <v-btn
      color="error"
      dark
      class="mx-1"
      @click="deleteDialog = true"
    >
      <v-icon>mdi-delete</v-icon>
      Delete
    </v-btn>
    <DeleteImporterDialog
      v-model="deleteDialog"
      @confirm="DeleteImporter"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { REMOVE_IMPORTER_ACTION } from '@/store/modules/config';
import DeleteImporterDialog from './DeleteImporterDialog';

export default {
  components: {
    DeleteImporterDialog,
  },
  props: {
    importer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      status: undefined,
      deleteDialog: false,
    };
  },
  methods: {
    DeleteImporter() {
      this.deleteDialog = false;
      this[REMOVE_IMPORTER_ACTION](this.importer.id);
    },
    ...mapActions([
      REMOVE_IMPORTER_ACTION,
      'updateImporterStatus',
    ]),
  },
};
</script>

<style scoped>
.v-input--selection-controls {
      margin-top: 0px;
      padding-top: 0px;
}
.v-input__slot {
  margin-bottom: 0px;
}
.v-messages {
  flex: 1 1 auto;
  font-size: 12px;
  min-height: 0px;
  min-width: 1px;
  position: relative;
}
</style>
