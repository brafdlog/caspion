<template>
  <log-sheet
    :value="true"
    :raw="$logger.getLastLines(10)"
  >
    Run
  </log-sheet>
</template>

<script>
import LogSheet from '@/components/shared/LogSheet';

export default {
  name: 'MainContent',
  components: { LogSheet }
};
</script>

<style>

</style>
