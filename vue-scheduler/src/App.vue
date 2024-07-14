<script setup lang="ts">
  import  HeaderComponent  from "./components/header_component/HeaderComponent.vue"
</script>

<template>
  <div :class="$style.app">
    <HeaderComponent />
    <h1>Hello World</h1>
  </div>
</template>

<style lang="scss" module>
  .app {
    height: calc(100vh - calc(2 * var(--page-p)));

    & > * {
      margin-bottom: var(--item-gap-size);
    }
  }
</style>
