<script setup lang="ts">
import RadialSeparators from './RadialSeparators.vue';
import LoadingComponent from '@/components/common_components/LoadingComponent.vue';
import CircleProgress from 'vue3-circle-progress';

interface ProgressBarProps {
  value: number;
  isBooked: boolean;
  isLoading: boolean;
  isError: boolean;
}
const props = defineProps<ProgressBarProps>();
</script>

<template>
  <!-- Wrap circular progress bar -->
  <div :class="$style.progressBar">
    <CircleProgress
      :percent="props.value"
      :class="$style.circularBar"
      :border-width="10"
      :border-bg-width="10"
      empty-color="#ACE1F0"
      fill-color="#2D3D46"
      linecap="flat"
    ></CircleProgress>
    <RadialSeparators :count="60" />
    <div :class="$style.statusContainer">
      <LoadingComponent v-if="props.isLoading" />
      <p v-else-if="props.isError" :class="$style.errorMsg">An error has occurred!</p>
      <p v-else-if="props.isBooked" :class="$style.inProgress">Meeting in progress</p>
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

  .circularBar {
    width: 95% !important;
    height: 95% !important;
    left: 4%;
  }

  .statusContainer {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    top: -100%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

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
