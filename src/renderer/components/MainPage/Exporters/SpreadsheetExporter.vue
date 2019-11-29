<template>
  <div>
    <button @click="foo">
      Foo
    </button>
  </div>
</template>

<script>
import foo from '../../../modules/spreadsheet';

const name = 'SpreadsheetExporter';
const title = 'Export to Google Spreadsheet';

export default {
  name,
  title,
  data() {
    return {
      title,
    };
  },
  methods: {
    async foo() {
      await foo();
    },
  },
};
</script>

<style>

</style>
