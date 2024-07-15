<script setup lang="ts">
import { handleTimeUntilFree } from '@/helpers/room_status_helper';
import ColorWaves from './ColorWaves.vue';
import ProgressBar from './progress_bar_components/ProgressBar.vue';
import type { EventInfo } from '@/types/EventInfo';
import { ref, watchEffect } from 'vue';

interface RoomStatusProps {
  currentEvent: EventInfo | null;
  currentMoment: Date;
  isLoading: boolean;
  isError: boolean;
}
const props = defineProps<RoomStatusProps>();
const { currentEvent, currentMoment, isLoading, isError } = props;

const initProgressBarValue = 100;
const progressBarValue = ref(100);

watchEffect(() => {
  if (currentEvent === null) {
    progressBarValue.value = initProgressBarValue;
  }
});

const handleProgressBarUpdate = () => {
  if (!currentEvent) return;
  const { minutesUntilFree, totalMeetingTime } = handleTimeUntilFree(currentEvent, currentMoment);
  const value = Math.round(
    initProgressBarValue - (initProgressBarValue * minutesUntilFree) / totalMeetingTime
  );

  if (value <= 100 && value !== progressBarValue.value) progressBarValue.value = value;
};

handleProgressBarUpdate();
</script>

<template>
  <div :class="$style.roomStatusWrapper">
    <ColorWaves :isBooked="false" />
    <ProgressBar
      :value="progressBarValue"
      :isLoading="isLoading"
      :isError="isError"
      :isBooked="!!currentEvent"
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
