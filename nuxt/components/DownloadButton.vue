<template>
  <div>
    <a
      :class="buttonStyle"
      class="mx-auto lg:mx-0 hover:underline font-bold rounded-full py-4 px-8 block"
      :href="mainLink"
    >
      התקן עכשיו
    </a>
    <div class="mx-auto text-center">
      <a :href="releasesUrl">
        הורדות נוספות
      </a>
    </div>
  </div>
</template>

<script>
const getOS = () => {
  if (process.client) {
    // This script sets OSName variable as follows:
    // "Windows"    for all versions of Windows
    // "MacOS"      for all versions of Macintosh OS
    // "Linux"      for all versions of Linux
    // "UNIX"       for all other UNIX flavors
    // "Unknown" indicates failure to detect the OS
    if (navigator.appVersion.includes('Android')) return 'Windows';
    if (navigator.appVersion.includes('Win')) return 'Windows';
    if (navigator.appVersion.includes('Mac')) return 'MacOS';
    if (navigator.appVersion.includes('Linux')) return 'Linux';
    if (navigator.appVersion.includes('X11')) return 'Linux';
  }

  return 'Unknown';
};

const osToExtension = {
  Linux: 'AppImage',
  Windows: 'exe',
  MacOS: 'dmg',
};

export default {
  name: 'DownloadButton',
  props: {
    buttonStyle: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
      mainLink: '',
      showDownloads: false,
      releasesUrl: `https://github.com/${GITHUB_REPO}/releases/latest`,
    };
  },
  created() {
    const extension = osToExtension[getOS()];

    this.mainLink = extension
      ? `${this.releasesUrl}/download/caspion.${extension}`
      : this.releasesUrl;
  },
};
</script>

<style>
</style>
