<script setup lang="ts">
import IndicatorComponent from './IndicatorComponent.vue';
import TimelineComponent from './timeline_components/TimelineComponent.vue';
</script>

<template>
  <div className="{styles.scheduler}">
    <IndicatorComponent />
    <TimelineComponent />
  </div>
</template>

<style lang="scss" module>
.scheduler {
  overflow: auto;
  margin: auto;
  position: relative;
  color: var(--white);
  width: 100%;
  height: 600px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--dark-blue);
    border-radius: 10px;

    &:hover {
      background-color: var(--light-blue);
    }
  }
}
</style>
