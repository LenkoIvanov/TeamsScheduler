<script setup lang="ts">
import {
  calculateGroupEventOffset,
  calculateSingularEventOffset,
  type EventOffset
} from '@/helpers/scheduler_helper';
import type { EventInfo } from '@/types/EventInfo';
import { reactive, ref, watchEffect } from 'vue';
import EventComponent from './EventComponent.vue';

interface GroupEventWrapperProps {
  groupIndeces: number[];
  allEventsInfo: EventInfo[];
}

interface ConcurrentEventInfo {
  eventDimensions: EventOffset;
  eventIdx: number;
  isFirst: boolean;
}

const props = defineProps<GroupEventWrapperProps>();
const { groupIndeces, allEventsInfo } = props;

const groupOffset = ref(0);

const concurrentEventsInfo: ConcurrentEventInfo[] = reactive([]);

watchEffect(() => {
  let firstElementOffset = 0;
  const eventsInfo: ConcurrentEventInfo[] = [];
  groupIndeces.forEach((eventIndex, iterationIndex) => {
    let eventDimensions: EventOffset = { topOffset: 0, eventHeight: 0 };
    if (iterationIndex === 0) {
      eventDimensions = calculateSingularEventOffset(allEventsInfo[eventIndex]);
      firstElementOffset = eventDimensions.topOffset;
      groupOffset.value = firstElementOffset;
    } else {
      eventDimensions = calculateGroupEventOffset(allEventsInfo[eventIndex], firstElementOffset);
    }

    eventsInfo.push({
      eventDimensions: eventDimensions,
      eventIdx: eventIndex,
      isFirst: iterationIndex === 0
    });
  });

  concurrentEventsInfo.splice(0, concurrentEventsInfo.length, ...eventsInfo);
});
</script>

<template>
  <div
    :class="$style.groupEventWrapper"
    :style="{
      top: `${groupOffset}px`,
      gridTemplateColumns: `repeat(${groupIndeces.length}, minmax(10px, 1fr))`
    }"
  >
    <div
      v-for="event in concurrentEventsInfo"
      :key="`event-${event.eventIdx}`"
      :style="{
        marginTop: `${event.isFirst ? 0 : event.eventDimensions.topOffset}px`,
        height: `${event.eventDimensions.eventHeight}px`
      }"
    >
      <EventComponent :eventInfo="allEventsInfo[event.eventIdx]" />
    </div>
  </div>
</template>

<style lang="scss" module>
.groupEventWrapper {
  display: grid;
  position: absolute;
  width: 80%;
  margin-left: calc(var(--item-gap-size) * 2.5);
  margin-right: var(--item-gap-size);
}
</style>
