<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <v-app-bar-nav-icon
        data-test="drawerLeftToggle"
        @click.stop="drawerLeft = !drawerLeft"
      />
      <div class="d-flex align-center">
        <span class="shrink mr-2 headline">Israeli Bank Scrapers Desktop</span>
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

      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight" />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawerLeft"
      app
      left
    >
      <Importers />
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="drawerRight"
      app
      right
    >
      <Exporters />
    </v-navigation-drawer>
    <v-footer
      app
      color="primary"
    >
      <profile-chip
        v-for="profile in profiles"
        :key="profile.email"
        :profile="profile"
      />
      <v-spacer />
      <v-btn
        text
        small
        @click="() => openExternal('https://github.com/baruchiro/israeli-bank-scrapers-desktop')"
      >
        <span class="mr-2">Open in Github</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-footer>
    <!-- The content come after all the 'app' components,
    to render when the $vuetify.application is ready -->
    <v-content>
      <DataTable />
    </v-content>
  </v-app>
</template>

<script>
import { shell } from 'electron';
import Importers from '@/components/MainPage/Importers';
import DataTable from '@/components/MainPage/DataTable';
import Exporters from '@/components/MainPage/Exporters';
import ProfileChip from '@/components/MainPage/ProfileChip';
import ReportProblemDialog from './MainPage/ReportProblemDialog';

export default {
  name: 'MainPage',
  components: {
    Importers, DataTable, Exporters, ProfileChip, ReportProblemDialog,
  },
  data() {
    return {
      drawerLeft: null,
      drawerRight: null,
      reportProblemDialog: false,
      profiles: [
        {
          avatar: 'https://avatars3.githubusercontent.com/u/17686879',
          name: 'Baruch Odem',
          email: 'baruchiro@gmail.com',
          networks: [
            'https://github.com/baruchiro',
            'https://www.linkedin.com/in/baruch-rothkoff/',
          ],
        },
        {
          avatar: 'https://media-exp1.licdn.com/dms/image/C5603AQHBVlsYLgmvNw/profile-displayphoto-shrink_800_800/0?e=1587600000&v=beta&t=iRvw54ZS2K6k3PKi4jgtpe-noj9XTzyUf3IMJvaWShQ',
          name: 'Ariel Gordon',
          email: 'arielgordon123@gmail.com',
          networks: [
            'https://github.com/Arielgordon123',
            'https://www.linkedin.com/in/ariel-gordon-462b14156/',
          ],
        },
      ],
    };
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
