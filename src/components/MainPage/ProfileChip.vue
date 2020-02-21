<template>
  <v-menu
    open-on-hover
    transition="scale-transition"
    origin="bottom left"
  >
    <template v-slot:activator="{ on }">
      <v-chip
        pill
        color="indigo"
        text-color="white"
        small
        v-on="on"
      >
        <v-avatar left>
          <img
            :alt="profile.name"
            :src="profile.avatar"
          >
        </v-avatar>
        {{ profile.name }}
      </v-chip>
    </template>
    <v-card width="300">
      <v-list dark>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="profile.avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ profile.name }}</v-list-item-title>
            <v-list-item-subtitle>
              <a @click="() => openExternal(`mailto:${profile.email}`)">
                {{ profile.email }}
              </a>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item
          v-for="network in profile.networks"
          :key="network"
          @click="() => openExternal(network)"
        >
          <v-list-item-action>
            <v-icon>{{ selectNetworkIcon(network) }}</v-icon>
          </v-list-item-action>
          <v-list-item-subtitle>{{ extractNickname(network) }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { shell } from 'electron';


export default {
  name: 'ProfileChip',
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  methods: {
    selectNetworkIcon(url) {
      if (url.toLowerCase().includes('github')) return 'mdi-github-box';
      if (url.toLowerCase().includes('linkedin')) return 'mdi-linkedin-box';
      return 'mdi-account-boxh';
    },
    extractNickname(url) {
      return /\/([\w-]+)\/?$/.exec(url)[1];
    },
    openExternal(url) {
      shell.openExternal(url);
    },
  },
};
</script>

<style>

</style>
