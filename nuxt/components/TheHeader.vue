<template>
  <nav
    :class="headerClassList"
    class="fixed w-full z-30 top-0"
  >
    <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
      <div class="pl-4 flex items-center">
        <logo
          :is-stickable="true"
          :is-sticky="isSticky"
        />
      </div>
      <div class="block lg:hidden pr-4">
        <button
          class="flex items-center p-1 text-orange-800 hover:text-gray-900"
          @click.prevent.stop="onToggleClick"
        >
          <svg
            class="fill-current h-6 w-6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>תפריט</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        :class="navContentClassList"
        class="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
      >
        <ul class="list-reset lg:flex justify-end flex-1 items-center">
          <li class="mr-3">
            <a
              v-scroll-to="'#hero'"
              class="inline-block py-2 px-4 text-black font-bold no-underline"
              href="#"
            >ראשי</a>
          </li>
          <li
            v-for="section in sections"
            :key="section.scrollTo"
            class="mr-3"
          >
            <a
              v-scroll-to="section.scrollTo"
              class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
              href="#"
            >{{ section.text }}</a>
          </li>
        </ul>
        <download-button
          :show-more-downloads="false"
          :button-style="navActionClassList"
        />
      </div>
    </div>
    <hr class="border-b border-gray-100 opacity-25 my-0 py-0">
  </nav>
</template>

<script>
import Logo from '@/components/Logo';
import DownloadButton from '@/components/DownloadButton';

const sections = [
  {
    scrollTo: '#features',
    text: 'תכונות',
  },
  {
    scrollTo: '#security',
    text: 'אבטחה',
  },
  {
    scrollTo: '#contact',
    text: 'צור קשר',
  },
  {
    scrollTo: '#FAQ',
    text: 'שאלות נפוצות',
  },
];

export default {
  name: 'TheHeader',
  components: {
    logo: Logo,
    'download-button': DownloadButton,
  },
  data() {
    return {
      scrollY: 0,
      isOpen: false,
    };
  },
  computed: {
    isSticky() {
      return this.scrollY > 10;
    },
    headerClassList() {
      return this.isSticky ? 'bg-white shadow' : '';
    },
    navActionClassList() {
      const sticky = this.isSticky ? 'gradient text-white' : 'bg-white text-gray-800';
      return `${sticky} shadow opacity-75 mt-4 lg:mt-0`;
    },
    navContentClassList() {
      let classList = this.isSticky ? 'bg-white' : 'bg-gray-100';
      if (!this.isOpen) {
        classList += ' hidden';
      }
      return classList;
    },
    sections() {
      return sections;
    },
  },
  mounted() {
    this.scrollY = window.scrollY;
    document.addEventListener('click', this.onClick);
    document.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.onClick, true);
    document.removeEventListener('scroll', this.onScroll, true);
  },
  methods: {
    onClick() {
      this.isOpen = false;
    },
    onScroll() {
      this.scrollY = window.scrollY;
    },
    onToggleClick() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
