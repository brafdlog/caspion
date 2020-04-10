<template>
  <div>
    <hero-content />
    <div class="relative -mt-6 lg:-mt-20">
      <img
        src="~assets/img/hero-wave.svg"
        alt
      >
    </div>
  </div>
</template>

<script>
import HeroContent from '@/components/HeroContent';

export default {
  name: 'Hero',
  components: {
    'hero-content': HeroContent,
  },
};
</script>
