<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ModalSkeletonProps {
  title: string;
}

const props = defineProps<ModalSkeletonProps>();
const emits = defineEmits(['modal-close']);
</script>

<template>
  <div :class="$style.backdrop" @click="emits('modal-close')"></div>
  <div :class="$style.modal">
    <div :class="$style.modalHeader">
      <h2 :class="$style.title">{{ props.title }}</h2>
      <FontAwesomeIcon :icon="faXmark" :class="$style.icon" @click="emits('modal-close')" />
    </div>
    <div :class="$style.modalContents">
      <slot name="children"></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
.backdrop {
  margin: 0 !important;
  background-color: var(--white);
  position: fixed;
  inset: 0;
  opacity: 0.2;
  z-index: 5;
}

.modal {
  width: 25rem;
  height: fit-content;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark-purple);
  color: var(--white);
  z-index: 10;
  padding: 1rem 2.5rem 3rem 2.5rem;
  border-radius: 25px;

  .modalHeader {
    display: flex;
    align-items: center;
    text-align: left;
    margin-bottom: var(--item-gap-size);

    .icon {
      cursor: pointer;
      margin-left: auto;
      height: 20px;
    }

    .title {
      font-size: 1.75rem;
    }
  }

  .modalContents {
    & > * {
      font-size: 1.25rem;
    }

    & > * + * {
      margin-top: var(--item-gap-size);
    }
  }
}
</style>
