<script setup lang="ts">
  import  HeaderComponent  from "./components/header_component/HeaderComponent.vue"
  import ButtonComponent from "./components/common_components/ButtonComponent.vue"
import LoadingComponent from "./components/common_components/LoadingComponent.vue";

  const handleClick = (payload: string) => console.log("Custom event: ", payload);
</script>

<template>
  <div :class="$style.app">
    <HeaderComponent />
    <h1>Hello World</h1>
    <ButtonComponent content="Test" theme="green" :disabled="false" @btn-click="handleClick" />
    <LoadingComponent />
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
