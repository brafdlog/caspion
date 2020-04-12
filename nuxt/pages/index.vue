<template>
  <div>
    <hero />
    <features />
    <teasers />
    <faq />
    <call-to-action />
  </div>
</template>

<script>
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Teasers from '@/components/Teasers';
import CallToAction from '@/components/CallToAction';
import FAQ from '@/components/FAQ';

export default {
  name: 'LandingPage',
  components: {
    hero: Hero,
    features: Features,
    teasers: Teasers,
    'call-to-action': CallToAction,
    faq: FAQ,
  },
};
</script>
