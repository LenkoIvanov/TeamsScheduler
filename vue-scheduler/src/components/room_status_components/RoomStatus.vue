<script setup lang="ts">
import { handleTimeUntilFree } from '@/helpers/room_status_helper';
import ColorWaves from './ColorWaves.vue';
import ProgressBar from './progress_bar_components/ProgressBar.vue';
import type { EventInfo } from '@/types/EventInfo';
import { computed } from 'vue';

interface RoomStatusProps {
  currentEvent: EventInfo | null;
  currentMoment: Date;
  isLoading: boolean;
  isError: boolean;
}
const props = defineProps<RoomStatusProps>();

const initProgressBarValue: number = 100;
const progressBarValue = computed<number>((oldValue) => {
  if (props.currentEvent === null || oldValue === undefined) return initProgressBarValue;

  const { minutesUntilFree, totalMeetingTime } = handleTimeUntilFree(
    props.currentEvent,
    props.currentMoment
  );
  const value = Math.round(
    initProgressBarValue - (initProgressBarValue * minutesUntilFree) / totalMeetingTime
  );

  if (value < 0 && value !== oldValue) return 0;

  if (value <= 100 && value !== oldValue) return value;

  return oldValue;
});
</script>

<template>
  <div :class="$style.roomStatusWrapper">
    <ColorWaves :isBooked="!!props.currentEvent" />
    <ProgressBar
      :value="progressBarValue"
      :isLoading="props.isLoading"
      :isError="props.isError"
      :isBooked="!!props.currentEvent"
    />
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
