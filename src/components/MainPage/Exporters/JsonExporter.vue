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
            :disabled="!validated"
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
import FormField from '@/components/shared/FormField';
import { GET_EXPORTER_GETTER, ADD_EXPORTER_ACTION } from '@/store/modules/Config';

// TODO rename to Exporter
// TODO need indication the data saved, maybe an 'Edit' button, or 'saved' label
export default {
  name: 'JsonExporter',
  components: {
    // TODO register global
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
      exporter: {},
      validated: true,
    };
  },
  computed: {
    loadedExporter() {
      return this.$store.getters[GET_EXPORTER_GETTER](this.vendor.name);
    }
  },
  methods: {
    updateExporter(value, fieldName) {
      this.exporter[fieldName] = value;
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        // TODO the arguments should be simple
        this.$store.dispatch(ADD_EXPORTER_ACTION, { name: this.vendor.name, ...this.exporter });
      }
    },
  },
};
</script>

<style scoped>

</style>
