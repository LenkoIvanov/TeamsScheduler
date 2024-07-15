<script setup lang="ts">
import TimelineElement from './TimelineElement.vue';
import { timeFormatting } from '../../../helpers/scheduler_helper';

const workDayStart = 8;
const workDayEnd = 20;
const workDayHours: number[] = [];
for (let n = workDayStart; n <= workDayEnd - 1; n++) workDayHours.push(n);
</script>

<template>
  <div :class="$style.timelineContainer">
    <TimelineElement v-for="n in workDayHours" :key="n" :currentHour="timeFormatting(n)" />
  </div>
</template>

<style lang="scss" module>
.timelineContainer {
  height: 600px;
}
</style>
