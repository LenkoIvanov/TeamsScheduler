<script setup lang="ts">
import ColorWaves from './ColorWaves.vue';
import type { EventInfo } from '@/types/EventInfo';
import { ref } from 'vue';

interface RoomStatusProps {
  events: EventInfo[];
  currentEvent: EventInfo | null;
  currentMoment: Date;
  isLoading: boolean;
  isError: boolean;
}
const props = defineProps<RoomStatusProps>();
const { events, currentEvent, currentMoment, isLoading, isError } = props;

const initProgressBarValue = 100;
const progressBarValue = ref(100);
</script>

<template>
  <div :class="$style.roomStatusWrapper">
    <ColorWaves :isBooked="false" />
  </div>
</template>

<style lang="scss" module>
.roomStatusWrapper {
  width: 100%;
  justify-self: center;
  aspect-ratio: 1/1;
  position: relative;
  padding: 0.75rem;
  color: var(--clr-white);
  overflow: hidden;
}
</style>
