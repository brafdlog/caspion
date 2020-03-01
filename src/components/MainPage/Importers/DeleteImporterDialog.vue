<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      persistent
      max-width="650"
    >
      <v-card>
        <v-card-title
          class="headline"
        >
          Warning
          <v-icon color="info">
            mdi-alert-circle
          </v-icon>
        </v-card-title>
        <v-card-text>
          This will permanently delete the importer. Continue?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="show = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="confirm"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm', true);
    },
  },
};
</script>
