<template>
  <div class="pt-24">
    <div class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      <!--Left Col-->
      <div
        class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-right"
      >
        <p class="uppercase tracking-loose w-full">
          קשה לך לעקוב אחרי ההוצאות?
        </p>
        <h1 class="my-4 text-5xl font-bold leading-tight">
          עו"שלי מרכז למקום אחד את כל פירוטי ההוצאות שלך
        </h1>
        <p
          class="leading-normal text-2xl mb-8"
        >
          בצורה מאובטחת, ללא צד שלישי ובפיקוח הקהילה
        </p>

        <div class="mx-auto my-6">
          <button
            class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full py-4 px-8 shadow-lg"
            @click="download"
          >
            התקן עכשיו
          </button>
          <div class="mx-auto text-center">
            <button @click="moreDownloads">
              הורדות נוספות
            </button>
            <div
              class="w-full text-right"
              :style="{visibility: showDownloads? 'visible' : 'hidden'}"
            >
              <ul>
                <li
                  v-for="obj in downloads"
                  :key="obj.name"
                >
                  <a
                    class="no-underline hover:underline text-blue-600"
                    :href="obj.url"
                    :title="obj.name"
                  >קובץ {{ obj.extension }}</a>
                </li>
              </ul>
              <a
                class="text-sm text-gray-800 font-bold"
                href="https://github.com/baruchiro/israeli-bank-scrapers-desktop/releases"
              >עוד...</a>
            </div>
          </div>
        </div>
      </div>
      <!--Right Col-->
      <div class="w-full md:w-3/5 py-6 text-center">
        <img
          class="w-full md:w-4/5 z-50"
          src="~/assets/img/hero.png"
          alt
        >
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

    if (navigator.appVersion.indexOf('Win') !== -1) return 'Windows';
    if (navigator.appVersion.indexOf('Mac') !== -1) return 'MacOS';
    if (navigator.appVersion.indexOf('Linux') !== -1) return 'Linux';
    if (navigator.appVersion.indexOf('X11') !== -1) return 'UNIX';
  }

  return 'Unknown';
};

const osToExtension = {
  Linux: {
    default: 'AppImage',
    extensions: ['AppImage', 'deb'],
  },
  UNIX: {
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
  name: 'HeroContent',
  data() {
    return {
      downloads: [],
      os: 'Unknown',
      showDownloads: false,
    };
  },
  created() {
    this.os = getOS();

    axios.get('https://api.github.com/repos/baruchiro/israeli-bank-scrapers-desktop/releases')
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
        window.open('https://github.com/baruchiro/israeli-bank-scrapers-desktop/releases', '_blank');
      }
    },
    moreDownloads() {
      if (this.downloads.length > 1) {
        this.showDownloads = !this.showDownloads;
      } else {
        window.open('https://github.com/baruchiro/israeli-bank-scrapers-desktop/releases', '_blank');
      }
    },
  },
};
</script>
