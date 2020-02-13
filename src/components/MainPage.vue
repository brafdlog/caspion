<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <v-app-bar-nav-icon @click.stop="drawerLeft = !drawerLeft" />
      <div class="d-flex align-center">
        <span class="shrink mr-2 headline">Israeli Bank Scrapers Desktop</span>
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
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight" />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawerLeft"
      app
      left
    >
      <Importers />
    </v-navigation-drawer>
    <v-content>
      <DataTable />
    </v-content>
    <v-navigation-drawer
      v-model="drawerRight"
      app
      right
    >
      <Exporters />
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import Importers from '@/components/MainPage/Importers';
import DataTable from '@/components/MainPage/DataTable';
import Exporters from '@/components/MainPage/Exporters';

export default {
  name: 'MainPage',
  components: { Importers, DataTable, Exporters },
  data() {
    return {
      drawerLeft: null,
      drawerRight: null,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
  margin-left: auto;
  margin-right: auto;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>
