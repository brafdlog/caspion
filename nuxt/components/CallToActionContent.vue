<template>
  <section class="container mx-auto text-center py-6 mb-12">
    <section-title white>
      צור קשר
    </section-title>

    <h3 class="my-4 text-3xl leading-tight">
      אנחנו שמחים לשמוע פידבקים, דיווחי באגים ובקשות לשיפור.
    </h3>

    <p>
      אם יש לך רעיון לייבוא נתונים ממקומות נוספים חוץ מאשר הבנקים וחברות האשראי.<br>
      או תוכנה נוספת שאפשר לייצא אליה את הנתונים.<br>
      נשמח מאוד לשמוע!
    </p>

    <a
      class="inline-block mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
      href="mailto:baruchiro@gmail.com"
      target="_blank"
    >
      שלח מייל!
    </a>
  </section>
</template>

<script>
import SectionTitle from '@/components/SectionTitle';

export default {
  name: 'CallToActionContent',
  components: {
    'section-title': SectionTitle,
  },
};
</script>
