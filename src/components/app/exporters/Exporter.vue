<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header disable-icon-rotate>
        {{ vendor.displayName }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-form
          ref="form"
          v-model="validated"
        >
          <form-field
            v-for="(fieldProps, fieldName) in vendor.fields"
            :key="fieldName"
            v-bind="fieldProps"
            :value="loadedExporter[fieldName]"
            @input="updateExporter($event, fieldName)"
          />
          <v-btn
            color="primary"
            :disabled="disableSave"
            @click="submitForm()"
          >
            Save
          </v-btn>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { GET_EXPORTER_GETTER, ADD_EXPORTER_ACTION } from '@/store/modules/config';

export default {
  name: 'JsonExporter',
  props: {
    vendor: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      exporter: {},
      validated: true,
      changed: false,
    };
  },
  computed: {
    loadedExporter() {
      return this.$store.getters[GET_EXPORTER_GETTER](this.vendor.name);
    },
    disableSave() {
      return !this.validated || !this.changed;
    }
  },
  methods: {
    updateExporter(value, fieldName) {
      this.changed = true;
      this.exporter[fieldName] = value;
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        // TODO the arguments should be simple
        this.$store.dispatch(ADD_EXPORTER_ACTION, { name: this.vendor.name, ...this.loadedExporter, ...this.exporter })
          .then(() => { this.changed = false; });
      }
    },
  },
};
</script>

<style scoped>

</style>
