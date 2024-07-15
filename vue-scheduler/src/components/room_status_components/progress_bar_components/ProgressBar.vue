<script setup lang="ts">
import RadialSeparators from './RadialSeparators.vue';
import LoadingComponent from '@/components/common_components/LoadingComponent.vue';

interface ProgressBarProps {
  value: number;
  isBooked: boolean;
  isLoading: boolean;
  isError: boolean;
}
const props = defineProps<ProgressBarProps>();
const { value, isBooked, isLoading, isError } = props;
</script>

<template>
  <!-- Wrap circular progress bar -->
  <div :class="$style.progressBar">
    <!-- <RadialSeparators :count="60" /> -->
    <div :class="$style.statusContainer">
      <LoadingComponent v-if="isLoading" />
      <p v-else-if="isError" :class="$style.errorMsg">An error has occurred!</p>
      <p v-else-if="isBooked" :class="$style.inProgress">Meeting in progress</p>
      <p v-else :class="$style.available">Available</p>
    </div>
  </div>
</template>

<style lang="scss" module>
.progressBar {
  width: 75%;
  aspect-ratio: 1/1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  overflow: hidden;

  .statusContainer {
    z-index: 2;

    p {
      font-size: 32px;
      font-weight: bold;
    }

    .available {
      color: var(--light-green);
    }

    .inProgress {
      color: var(--dark-red);
    }

    .errorMsg {
      color: var(--light-red);
      font-size: 28px;
    }
  }
}
</style>
