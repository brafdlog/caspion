<template>
  <v-form>
    <v-text-field
      v-model="properties.folder"
      label="Folder to save"
      outlined
    />
    <v-text-field
      v-model="properties.file"
      label="File to save"
      outlined
    />
    <v-btn
      color="primary"
      :loading="loading"
      @click="submitForm()"
    >
      Export
    </v-btn>
  </v-form>
</template>

<script>
import path from 'path';
import { remote } from 'electron';
import { mapState, mapActions } from 'vuex';
import { transactionArrayToObject } from '@/modules/transactions';
import { readFileToObject, writeFile } from '@/modules/filesystem';

const name = 'JsonExporter';
const title = 'Export to Json file';

export default {
  name,
  title,
  data() {
    return {
      properties: {
        folder: path.join(
          remote.app.getPath('cache'),
          remote.app.getName(),
        ),
        file: 'transactions.json',
      },
      loading: false,
    };
  },
  computed: {
    ...mapState({
      storeProperties: (state) => state.Exporters[name],
      transactions: (state) => state.Transactions.transactions,
    }),
  },
  created() {
    this.properties = { ...this.properties, ...this.storeProperties };
  },
  methods: {
    ...mapActions(['saveExporterProperties']),
    emitStatus(success, message) {
      this.$emit('update:success', success);
      this.$emit('update:message', message);
    },
    submitForm() {
      this.loading = true;
      try {
        this.saveExporterProperties({ name, properties: this.properties });

        const filePath = path.join(
          this.properties.folder,
          this.properties.file,
        );
        const savedObject = transactionArrayToObject(
          readFileToObject(filePath, []),
        );
        const combineObject = { ...savedObject, ...this.transactions };
        writeFile(
          filePath,
          JSON.stringify(Object.values(combineObject), null, 4),
        );
        this.emitStatus(true, `Your data saved in ${filePath}`);
      } catch (error) {
        this.$logger.error(error.message);
        if (error.stack) this.$logger.verbose(error.stack);
        this.emitStatus(false, error.message);
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>

</style>
