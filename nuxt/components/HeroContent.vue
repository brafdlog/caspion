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

        <button
          class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
          @click.native="download"
        >
          התקן עכשיו
        </button>
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
export default {
  name: 'HeroContent',
  methods: {
    download() {
      // This script sets OSName variable as follows:
      // "Windows"    for all versions of Windows
      // "MacOS"      for all versions of Macintosh OS
      // "Linux"      for all versions of Linux
      // "UNIX"       for all other UNIX flavors
      // "Unknown OS" indicates failure to detect the OS

      let OSName = 'Unknown OS';
      if (navigator.appVersion.indexOf('Win') !== -1) OSName = 'Windows';
      if (navigator.appVersion.indexOf('Mac') !== -1) OSName = 'MacOS';
      if (navigator.appVersion.indexOf('X11') !== -1) OSName = 'UNIX';
      if (navigator.appVersion.indexOf('Linux') !== -1) OSName = 'Linux';
      window.open(`https://www.google.com?q=${OSName}`, '_blank');
    },
  },
};
</script>
