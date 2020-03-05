<template>
  <div>
    <hero-content />
    <div class="relative -mt-12 lg:-mt-24">
      <img src="~assets/img/hero-wave.svg" alt />
    </div>
  </div>
</template>

<script>
import HeroContent from '@/components/HeroContent'

export default {
  name: 'Hero',
  components: {
    'hero-content': HeroContent
  }
}
</script>
