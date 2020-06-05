<template>
  <footer class="bg-white">
    <div class="container mx-auto px-8">
      <div class="w-full flex flex-col md:flex-row py-6">
        <div class="flex-1 mb-6">
          <logo />
        </div>

        <div
          v-for="(link, name) in links"
          :key="name"
          class="flex-1"
        >
          <p class="uppercase text-gray-500 md:mb-6">
            {{ name }}
          </p>
          <ul class="list-reset mb-6">
            <li
              v-for="(href, text) in link"
              :key="text"
              class="mt-2 inline-block mr-2 md:block md:mr-0"
            >
              <a
                v-scroll-to="href.startsWith('#') ? href : null"
                :href="href.startsWith('#') ? '#' : href"
                :target="href.startsWith('#')? null : '_blank'"
                class="no-underline hover:underline text-gray-800 hover:text-orange-500"
              >{{ text }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <a
      href="https://www.freepik.com/free-photos-vectors/background"
    >Background vector created by freepik - www.freepik.com</a>
  </footer>
</template>

<script>
import Logo from '@/components/Logo';

const repo = `https://github.com/${GITHUB_REPO}`;

const links = {
  קישורים: {
    'שאלות נפוצות': '#FAQ',
    'צור קשר': '#contact',
    תמיכה: `${repo}/issues/new`,
  },
  משפטי: {
    רשיון: `${repo}/blob/master/LICENSE`,
  },
  מפתחים: {
    GitHub: repo,
    'ברוך אודם': 'https://github.com/baruchiro',
    'אריאל גורדון': 'https://github.com/Arielgordon123',
  },
};

export default {
  name: 'TheFooter',
  components: {
    logo: Logo,
  },
  computed: {
    links() {
      return links;
    },
  },
};
</script>
