<template>
  <section
    id="security"
    class="bg-white border-b py-8"
  >
    <div class="container mx-auto flex flex-wrap pt-4 pb-12">
      <section-title>עקרונות האבטחה</section-title>
      <teaser-column
        :rows="3"
      >
        <template v-slot:overline>
          עקרון #1
        </template>
        <template v-slot:headline>
          ריצה מקומית
        </template>
        <template
          v-slot:content
        >
          האפליקצייה רצה מקומית אצלך במחשב. הסיסמאות לא נשלחות לאף אחד, ולא מתבצעת שום בקשה לשירות חיצוני כלשהו כדי לקבל את המידע.
        </template>
      </teaser-column>
      <teaser-column
        :rows="3"
        action="GitHub"
        @clicked="openGithub"
      >
        <template v-slot:overline>
          עקרון #2
        </template>
        <template v-slot:headline>
          קוד פתוח
        </template>
        <template
          v-slot:content
        >
          ניתן ממש לראות את הקוד בו כתובה האפליקצייה, ובמקרה הצורך גם להריץ אותה ישירות מהקוד, כדי להיות בטוחים באמינות השירות.
        </template>
      </teaser-column>
    </div>
  </section>
</template>

<script>
import TeaserColumn from '@/components/TeaserColumn';
import SectionTitle from '@/components/SectionTitle';

export default {
  name: 'Teasers',
  components: {
    'teaser-column': TeaserColumn,
    'section-title': SectionTitle,
  },
  methods: {
    openGithub() {
      window.open(`https://github.com/${GITHUB_REPO}`, '_blank');
    },
  },
};
</script>
