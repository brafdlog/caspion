<template>
  <section class="bg-white border-b py-8">
    <div class="container max-w-5xl mx-auto m-8">
      <h1 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
        תכונות
      </h1>
      <div class="w-full mb-4">
        <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
      </div>
      <feature-right
        headline="ייבוא מאתר הבנק"
        content="בעו&quot;שי ניתן לייבא נתונים בצורה אוטומטית מפירוט העובר ושב של חשבונות הבנק והאשראי."
      >
        <img
          slot="svg"
          src="~assets/img/travel-booking.svg"
          alt
        >
      </feature-right>
      <feature-left
        headline="ייצוא לתוכנות ניהול"
        content="את הנתונים שעו&quot;שי מושך מחשבונות הבנק והאשראי ניתן לייצא לתוכנות ניהול נתונים שונות."
      >
        <img
          slot="svg"
          src="~assets/img/connected-world.svg"
          alt
        >
      </feature-left>
    </div>
  </section>
</template>

<script>
import FeatureRight from '@/components/FeatureRight';
import FeatureLeft from '@/components/FeatureLeft';

export default {
  name: 'Features',
  components: {
    'feature-right': FeatureRight,
    'feature-left': FeatureLeft,
  },
};
</script>
