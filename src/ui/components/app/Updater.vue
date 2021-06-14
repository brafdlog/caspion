<template>
  <div
    v-if="state === STATES.LOADING"
    class="progress"
  >
    <v-progress-linear
      :indeterminate="true"
      class="mr-2"
      color="black lighten-2"
    />
  </div>
  <v-btn
    v-else-if="state === STATES.INIT"
    text
    small
    @click="checkUpdates"
  >
    <span class="mr-2">Check for updates</span>
  </v-btn>
  <div v-else-if="state === STATES.NO_NEW_VERSION">
    No update available
  </div>
  <div v-else-if="state === STATES.NEW_VERSION_AVAIL">
    <v-btn
      text
      small
      @click="downloadNewVersion"
    >
      Download version {{ updateInfo.version }}
    </v-btn>
    <v-btn
      text
      small
      @click="openGithubRelease"
    >
      Github
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
    <v-btn
      text
      small
      @click="openCompare"
    >
      Compare
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </div>
  <v-btn
    v-else-if="state === STATES.READY_TO_INSTALL"
    text
    small
    @click="quitAndInstall"
  >
    Quit and install
  </v-btn>
  <div v-else>
    Error during update
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { checkForUpdateHandler, downloadUpdateHandler, quitAndInstallHandler } from '@/handlers';
import logger from '@/logging/logger';
import { App } from '@/app-globals';
import { shell } from 'electron';
import { repository } from '../../../../package.json';

enum STATES {
  INIT,
  LOADING,
  ERROR,
  NEW_VERSION_AVAIL,
  NO_NEW_VERSION,
  READY_TO_INSTALL,
}

const currentVersion = App.getVersion();

export default defineComponent({
  setup() {
    const state = ref(STATES.INIT);
    const updateInfo = ref({ version: '0.0.6' });

    const checkUpdates = async () => {
      state.value = STATES.LOADING;
      checkForUpdateHandler.invoke()
        .then((info) => {
          logger.info({ info });
          updateInfo.value = info;
          state.value = info
            ? STATES.NEW_VERSION_AVAIL
            : STATES.NO_NEW_VERSION;
        })
        .catch(() => (state.value = STATES.ERROR));
    };
    const downloadNewVersion = async () => {
      state.value = STATES.LOADING;
      downloadUpdateHandler.invoke()
        .then(() => (state.value = STATES.READY_TO_INSTALL))
        .catch(() => (state.value = STATES.ERROR));
    };
    const quitAndInstall = () => quitAndInstallHandler.invoke();
    const openGithubRelease = () => {
      shell.openExternal(`${repository}/releases/tag/v${updateInfo.value.version}`);
    };
    const openCompare = () => {
      shell.openExternal(`${repository}/compare/v${currentVersion}...v${updateInfo.value.version}`);
    };

    return {
      STATES,
      state,
      updateInfo,
      currentVersion,
      checkUpdates,
      downloadNewVersion,
      quitAndInstall,
      openGithubRelease,
      openCompare
    };
  },
});
</script>

<style scoped>
.progress {
  min-width: 10vw;
}
</style>
