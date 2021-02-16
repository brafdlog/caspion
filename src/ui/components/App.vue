<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      clipped-right
      color="primary"
    >
      <div class="d-flex align-center">
        <span class="shrink mr-2 headline"> {{ appName }} </span>
      </div>

      <v-spacer />

      <report-problem-dialog v-model="reportProblemDialog" />
      <v-btn
        text
        @click.stop="reportProblemDialog = true"
      >
        <span class="mr-2">Report a problem</span>
        <v-icon>mdi-chat-alert-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      stateless
      clipped
      value="true"
      disable-resize-watcher
      app
      left
    >
      <Importers />
    </v-navigation-drawer>
    <v-navigation-drawer
      stateless
      clipped
      value="true"
      disable-resize-watcher
      app
      right
    >
      <Exporters />
    </v-navigation-drawer>
    <v-footer
      app
      color="primary"
    >
      <v-spacer />
      <v-btn
        text
        small
        @click="() => openExternal(appRepository)"
      >
        <span class="mr-2">Open in Github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-footer>
    <!-- The content come after all the 'app' components,
    to render when the $vuetify.application is ready -->
    <v-main>
      <main-content />
    </v-main>
  </v-app>
</template>

<script>
import { shell } from 'electron';
import Importers from '@/ui/components/app/Importers';
import Exporters from '@/ui/components/app/Exporters';
import { trackPage } from '@/analytics';
import ReportProblemDialog from './app/ReportProblemDialog';
import MainContent from './app/MainContent';
import { repository } from '../../../package.json';

export default {
  name: 'App',
  components: {
    Importers, MainContent, Exporters, ReportProblemDialog,
  },
  data() {
    return {
      reportProblemDialog: false,
      appRepository: repository,
      appName: APP_NAME
    };
  },
  mounted() {
    trackPage('Home');
  },
  methods: {
    openExternal(url) {
      shell.openExternal(url);
    },
  },
};
</script>

<style>

</style>
