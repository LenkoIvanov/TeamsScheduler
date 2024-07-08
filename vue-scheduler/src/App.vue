<script setup lang="ts">
  import { fetchEvents } from './api/rest';

  const data = await fetchEvents();
  console.log(data);
</script>

<template>
  <header>
  </header>

  <main>
    Hello World
  </main>
</template>

<style scoped>
</style>
