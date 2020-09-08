<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header disable-icon-rotate>
        {{ title }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <slot />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ExpansionPanel',
  props: {
    title: {
      type: String,
      required: true,
    }
  }
});
</script>

<style>
</style>
