<template>
  <v-bottom-sheet scrollable>
    <template v-slot:activator="{ on }">
      <slot :on="on" />
    </template>
    <v-card>
      <v-card-title>
        Current Log
      </v-card-title>
      <v-card-subtitle v-show="!raw">
        Showing the last 10 rows
      </v-card-subtitle>
      <v-card-text style="height: 30vh;">
        <pre>
{{ textToShow }}
        </pre>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import fs from 'fs';

export default {
  name: 'LogSheet',
  props: {
    raw: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    textToShow() {
      if (this.raw) return this.raw;

      const lines = fs.readFileSync(this.$logger.transports.file.getFile().path).toString().split('\n');
      const lastLines = lines.slice(lines.length - 10);
      return lastLines.join('\n');
    },
  },
};
</script>

<style>

</style>
