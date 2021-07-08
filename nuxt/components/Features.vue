<template>
  <section
    id="features"
    class="bg-white border-b py-8"
  >
    <div class="container max-w-5xl mx-auto m-8">
      <section-title>תכונות</section-title>
      <feature-right
        headline="ייבוא מאתר הבנק"
        content="עם כספיון, ניתן לייבא נתונים בצורה אוטומטית מפירוט העובר ושב של חשבונות הבנק והאשראי."
      >
        <img
          slot="svg"
          src="~assets/img/cloud_files.svg"
          alt
        >
      </feature-right>
      <feature-left headline="ייצוא לתוכנות ניתוח נתונים">
        <img
          slot="svg"
          src="~assets/img/google-data-studio.png"
          alt
        >
        <div
          slot="content"
        >
          את הנתונים ש<i>כספיון</i> מושך מחשבונות הבנק והאשראי ניתן לייצא לתוכנות ניהול נתונים שונות, כמו Excel, Google Sheets וYNAB.
          <br><br>
          <a href="https://bscstudent.netlify.app/caspion">להסבר על ייצוא נתונים והצגה שלהם עם Google Data Studio.</a>
        </div>
      </feature-left>
    </div>
  </section>
</template>

<script>
import FeatureRight from '@/components/FeatureRight';
import FeatureLeft from '@/components/FeatureLeft';
import SectionTitle from '@/components/SectionTitle';

export default {
  name: 'Features',
  components: {
    'feature-right': FeatureRight,
    'feature-left': FeatureLeft,
    'section-title': SectionTitle,
  },
};
</script>
