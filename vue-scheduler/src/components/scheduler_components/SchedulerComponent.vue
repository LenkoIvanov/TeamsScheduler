<script setup lang="ts">
import { computed, onMounted, onUpdated } from 'vue';
import IndicatorComponent from './IndicatorComponent.vue';
import TimelineComponent from './timeline_components/TimelineComponent.vue';
import SingularEventWrapper from './event_components/SingularEventWrapper.vue';
import GroupEventWrapper from './event_components/GroupEventWrapper.vue';
import {
  calculateSingularEventOffset,
  getLastConcurrentEventIdx,
  indicatorId,
  type EventOffset
} from '@/helpers/scheduler_helper';
import type { EventInfo } from '@/types/EventInfo';

interface SingularEventsInfo {
  eventDimensions: EventOffset;
  eventInfo: EventInfo;
  eventIdx: number;
}

interface GroupEventsInfo {
  allEventsInfo: EventInfo[];
  groupIndeces: number[];
}

interface SchedulerProps {
  events: EventInfo[];
}
const props = defineProps<SchedulerProps>();

const focusOnIndicator = () => {
  const indicatorComponent = document.getElementById(indicatorId);
  if (indicatorComponent)
    indicatorComponent.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
};
// Scroll the IndicatorComponent into view
onMounted(focusOnIndicator);
onUpdated(focusOnIndicator);

const eventData = computed<{
  singularEventsInfo: SingularEventsInfo[];
  groupEventsInfo: GroupEventsInfo[];
}>(() => {
  const singularEvents: SingularEventsInfo[] = [];
  const groupEvents: GroupEventsInfo[] = [];

  let idxOfLastConcurrentElement = -1;
  for (let i = 0; i < props.events.length; i++) {
    if (i <= idxOfLastConcurrentElement) continue;
    const response = getLastConcurrentEventIdx(i, props.events);
    if (response.lastIdx !== -1) {
      idxOfLastConcurrentElement = response.lastIdx;
      groupEvents.push({
        allEventsInfo: props.events,
        groupIndeces: response.allIndeces
      });
    } else {
      const eventDimensions = calculateSingularEventOffset(props.events[i]);
      singularEvents.push({
        eventDimensions: eventDimensions,
        eventInfo: props.events[i],
        eventIdx: i
      });
    }
  }

  return { singularEventsInfo: singularEvents, groupEventsInfo: groupEvents };
});
</script>

<template>
  <div :class="$style.scheduler">
    <IndicatorComponent />
    <TimelineComponent />
    <SingularEventWrapper
      v-for="singular in eventData.singularEventsInfo"
      :key="`event-${singular.eventIdx}`"
      :eventInfo="singular.eventInfo"
      :topOffset="singular.eventDimensions.topOffset"
      :eventHeight="singular.eventDimensions.eventHeight"
    />
    <GroupEventWrapper
      v-for="group in eventData.groupEventsInfo"
      :key="`group-events-${group.groupIndeces[0]}`"
      :allEventsInfo="group.allEventsInfo"
      :groupIndeces="group.groupIndeces"
    />
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
