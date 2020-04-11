<template>
  <div>
    <hero />
    <features />
    <teasers />
    <call-to-action />
  </div>
</template>

<script>
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Teasers from '@/components/Teasers';
import CallToAction from '@/components/CallToAction';

export default {
  name: 'LandingPage',
  components: {
    hero: Hero,
    features: Features,
    teasers: Teasers,
    'call-to-action': CallToAction,
  },
};
</script>
