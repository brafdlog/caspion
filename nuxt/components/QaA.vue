<template>
  <div
    class="qa"
    :class="qaClass"
    v-html="$md.render(md)"
  />
</template>

<script>
export default {
  name: 'QA',
  props: {
    md: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      qaClass: 'qa-close',
    };
  },
  mounted() {
    this.$el.querySelector('h1').addEventListener('click', this.collapse);
  },
  methods: {
    collapse() {
      if (this.qaClass === 'qa-close') this.qaClass = 'qa-open';
      else this.qaClass = 'qa-close';
    },
  },
};
</script>
