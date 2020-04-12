<template>
  <section
    id="features"
    class="bg-white border-b py-8"
  >
    <div class="container max-w-5xl mx-auto m-8">
      <section-title>תכונות</section-title>
      <feature-right
        headline="ייבוא מאתר הבנק"
        content="בעו&quot;שי ניתן לייבא נתונים בצורה אוטומטית מפירוט העובר ושב של חשבונות הבנק והאשראי."
      >
        <img
          slot="svg"
          src="~assets/img/cloud_files.svg"
          alt
        >
      </feature-right>
      <feature-left
        headline="ייצוא לתוכנות ניהול"
        content="את הנתונים שעו&quot;שי מושך מחשבונות הבנק והאשראי ניתן לייצא לתוכנות ניהול נתונים שונות."
      >
        <img
          slot="svg"
          src="~assets/img/file_sync.svg"
          alt
        >
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
