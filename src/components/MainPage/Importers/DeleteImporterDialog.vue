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
          This will permanently delete the importer. Continue?
        </v-card-title>
        <v-card-text />
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
        this.value = value;
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
