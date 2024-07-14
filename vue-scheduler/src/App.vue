<script setup lang="ts">
  import  HeaderComponent  from "./components/header_component/HeaderComponent.vue";
  import ButtonComponent from "./components/common_components/ButtonComponent.vue";
  import LoadingComponent from "./components/common_components/LoadingComponent.vue";
  import ModalSkeleton from "./components/modal_components/ModalSkeleton.vue";
import { ref } from "vue";

  const showModal = ref(false);

  const handleModalOpen = () => {
    showModal.value = true;
  };
  const handleModalClose = () => {
    showModal.value = false;
  };
</script>

<template>
  <div :class="$style.app">
    <HeaderComponent />
    <h1>Hello World</h1>
    <ButtonComponent content="Test" theme="green" :disabled="false" @btn-click="handleModalOpen" />
    <LoadingComponent />
    <ModalSkeleton v-if="showModal" title="Test skeleton" @modal-close="handleModalClose">
      <template v-slot:children>
        Im a child
      </template>
    </ModalSkeleton>
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
