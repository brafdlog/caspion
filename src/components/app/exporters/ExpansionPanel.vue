<template>
  <v-dialog
    v-model="showDialog"
  >
    <template v-slot:activator="{ on, attrs }">
      <div>
        <v-chip
          v-bind="attrs"
          :class="{ blue: enabled, 'lighten-4': true }"
          v-on="on"
        >
          <v-avatar left>
            <v-img :src="logoSrcWithPrefix" />
          </v-avatar>
          {{ title }}
        </v-chip>
      </div>
    </template>
    <div class="exporterSettingsWrapper">
      <slot />
    </div>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { PUBLIC_BUCKET_URL_PREFIX } from '@/consts';

export default Vue.extend({
  name: 'ExpansionPanel',
  props: {
    title: {
      type: String,
      required: true,
    },
    logoImage: {
      type: String,
      default: 'piggy.png'
    },
    enabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {
    logoSrcWithPrefix() {
      return `${PUBLIC_BUCKET_URL_PREFIX}/logos/${this.logoImage}`;
    }
  }
});
</script>

<style>
  .exporterSettingsWrapper {
    background: white;
    padding: 20px;
  }
</style>
