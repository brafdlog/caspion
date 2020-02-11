<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span class="shrink mr-2 headline">{{ appName }} </span>
      </div>

      <v-spacer />

      <v-btn
        href="https://github.com/baruchiro/israeli-bank-scrapers-desktop"
        target="_blank"
        text
      >
        <span class="mr-2">Open in Github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <MainPage />
    </v-content>
  </v-app>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';
import MainPage from './components/MainPage';

const appName = remote.app.getName();

export default {
  name: 'IsraeliBankScrapersDesktop',
  components: {
    MainPage,
  },
  data() {
    return {
      appName,
    };
  },
};
</script>
