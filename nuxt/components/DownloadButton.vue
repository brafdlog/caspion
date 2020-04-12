<template>
  <div>
    <button
      :class="buttonStyle"
      class="mx-auto lg:mx-0 hover:underline font-bold rounded-full py-4 px-8"
      @click="download"
    >
      התקן עכשיו
    </button>
    <div
      v-if="showMoreDownloads"
      class="mx-auto text-center"
    >
      <button @click="moreDownloads">
        הורדות נוספות
      </button>
      <div
        class="w-full text-gray-800 "
        :style="{visibility: showDownloads? 'visible' : 'hidden'}"
      >
        <span
          v-for="obj in downloads"
          :key="obj.name"
        >
          <a
            class="no-underline hover:underline text-blue-600"
            :href="obj.url"
            :title="obj.name"
          >{{ obj.extension }}</a>, </span>
        <a
          class="font-bold hover:underline"
          :href="releasesUrl"
          target="_blank"
        >עוד...</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
  Linux: {
    default: 'AppImage',
    extensions: ['AppImage', 'deb'],
  },
  Windows: {
    default: 'exe',
    extensions: ['exe'],
  },
};

const excludeExtensions = ['blockmap', 'yml'];

const isWithExtension = (extensions, name) => extensions.filter((ext) => name.toLowerCase().endsWith(ext.toLowerCase())).length > 0;

export default {
  name: 'DownloadButton',
  props: {
    showMoreDownloads: {
      type: Boolean,
      default: true,
      required: false,
    },
    buttonStyle: {
      type: String,
      default: '',
      required: false,
    },
  },
  data() {
    return {
      downloads: [],
      os: 'Unknown',
      showDownloads: false,
      releasesUrl: `https://github.com/${GITHUB_REPO}/releases`,
    };
  },
  created() {
    this.os = getOS();

    axios.get(`https://api.github.com/repos/${GITHUB_REPO}/releases`)
      .then((response) => response.data)
      .then((releases) => releases
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
        .find((release) => !release.draft))
      .then((release) => {
        const osExtension = osToExtension[this.os];

        const filteredAssets = osExtension && osExtension.extensions.length > 0
          ? release.assets.filter((asset) => isWithExtension(osExtension.extensions, asset.name))
          : release.assets;

        this.downloads = filteredAssets
          .filter((asset) => !isWithExtension(excludeExtensions, asset.name))
          .map(({ name, browser_download_url: url }) => {
            const splitted = name.split('.');
            const extension = splitted[splitted.length - 1];
            return {
              name,
              url,
              extension,
            };
          });
      });
  },
  methods: {
    download() {
      const defaultExt = osToExtension[this.os].default;
      const download = this.downloads.find(({ name }) => name.toLowerCase().endsWith(defaultExt.toLowerCase()));
      if (download) {
        window.open(download.url);
      } else {
        this.openReleasesPage();
      }
    },
    moreDownloads() {
      if (this.downloads.length > 1) {
        this.showDownloads = !this.showDownloads;
      } else {
        this.openReleasesPage();
      }
    },
    openReleasesPage() {
      window.open(this.releasesUrl, '_blank');
    },
  },
};
</script>

<style>

</style>
