<template>
  <footer class="bg-white">
    <div class="container mx-auto px-8">
      <div class="w-full flex flex-col md:flex-row py-6">
        <div class="flex-1 mb-6">
          <logo />
        </div>

        <div
          v-for="(allLinks, name) in links"
          :key="name"
          class="flex-1"
        >
          <p class="uppercase text-gray-500 md:mb-6">
            {{ name }}
          </p>
          <ul class="list-reset mb-6">
            <li
              v-for="link in allLinks"
              :key="link.text"
              class="mt-2 inline-block mr-2 md:block md:mr-0"
            >
              <a
                :href="link.href"
                :target="link.href.startsWith('#')? '' : '_blank'"
                class="no-underline hover:underline text-gray-800 hover:text-orange-500"
                v-scroll-to="link.scrollTo"
              >{{ link.text }}</a>
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
  קישורים: [
    {
      scrollTo: '#FAQ',
      text: 'שאלות נפוצות',
      href: '#',
    },
    {
      scrollTo: '#contact',
      text: 'צור קשר',
      href: '#',
    },
    {
      text: 'תמיכה',
      href: `${repo}/issues/new`,
    },
  ],
  משפטי: [
    {
      text: 'רשיון',
      href: `${repo}/blob/master/LICENSE`,
    },
  ],
  מפתחים: [
    {
      text: 'GitHub',
      href: repo,
    },
    {
      text: 'ברוך אודם',
      href: 'https://github.com/baruchiro',
    },
    {
      text: 'אריאל גורדון',
      href: 'https://github.com/Arielgordon123',
    },
  ],
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
