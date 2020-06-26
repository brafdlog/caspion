<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header disable-icon-rotate>
        {{ vendor.displayName }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-form>
          <form-field
            v-for="(fieldProps, fieldName) in vendor.fields"
            :key="fieldName"
            v-model="properties.file"
            v-bind="fieldProps"
          />
          <v-btn
            color="primary"
            :loading="loading"
            @click="submitForm()"
          >
            Export {{ properties.file }}
          </v-btn>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import path from 'path';
import { remote } from 'electron';
import { mapState, mapActions } from 'vuex';
import { transactionArrayToObject } from '@/modules/transactions';
import { readFileToObject, writeFile } from '@/modules/filesystem';
import FormField from '@/components/shared/FormField';

const name = 'JsonExporter';
const title = 'Export to Json file';

export default {
  name,
  title,
  components: {
    FormField
  },
  props: {
    vendor: {
      type: Object,
      required: true,
    }
  },
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
