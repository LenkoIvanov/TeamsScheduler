<script setup lang="ts">
import type { EventInfo } from '@/types/EventInfo';
import EventComponent from './EventComponent.vue';

interface SingularEventWrapperProps {
  topOffset: number;
  eventHeight: number;
  eventInfo: EventInfo;
}

const props = defineProps<SingularEventWrapperProps>();
</script>

<template>
  <div
    :class="$style.eventWrapper"
    :style="{ top: `${props.topOffset}px`, height: `${props.eventHeight}px` }"
  >
    <EventComponent :eventInfo="props.eventInfo" />
  </div>
</template>

<style lang="scss" module>
.eventWrapper {
  position: absolute;
  width: 80%;
  margin-left: calc(var(--item-gap-size) * 2.5);
  margin-right: var(--item-gap-size);
}
</style>
