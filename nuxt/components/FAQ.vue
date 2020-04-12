<template>
  <div
    id="FAQ"
    class="bg-white border-b py-8 px-6"
  >
    <section-title>שאלות נפוצות</section-title>
    <qa
      v-for="qa in allQuestions"
      :key="qa.trim()"
      :md="qa"
    />
  </div>
</template>

<script>
import SectionTitle from '@/components/SectionTitle';
import QaA from '@/components/QaA';

export default {
  components: {
    'section-title': SectionTitle,
    qa: QaA,
  },
  computed: {
    allQuestions() {
      return FAQ_STRINGS_LIST;
    },
  },
};
</script>
