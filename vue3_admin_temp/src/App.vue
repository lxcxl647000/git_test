<template>
  <h1>hello</h1>
  <button @click="count++">count:{{ count }}</button>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  let count = ref(0);
</script>

<style scoped></style>