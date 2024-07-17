<script setup lang="ts">
import { onMounted, reactive, toRefs, watch } from 'vue';
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
const { events } = toRefs(props);

// Scroll the IndicatorComponent into view
onMounted(() => {
  const indicatorComponent = document.getElementById(indicatorId);
  if (indicatorComponent)
    indicatorComponent.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
});

const singularEventsInfo: SingularEventsInfo[] = reactive([]);
const groupEventsInfo: GroupEventsInfo[] = reactive([]);

watch(events, () => {
  const singularEvents: SingularEventsInfo[] = [];
  const groupEvents: GroupEventsInfo[] = [];

  let idxOfLastConcurrentElement = -1;
  for (let i = 0; i < events.value.length; i++) {
    if (i <= idxOfLastConcurrentElement) continue;
    const response = getLastConcurrentEventIdx(i, events.value);
    if (response.lastIdx !== -1) {
      idxOfLastConcurrentElement = response.lastIdx;
      groupEvents.push({
        allEventsInfo: events.value,
        groupIndeces: response.allIndeces
      });
    } else {
      const eventDimensions = calculateSingularEventOffset(events.value[i]);
      singularEvents.push({
        eventDimensions: eventDimensions,
        eventInfo: events.value[i],
        eventIdx: i
      });
    }
  }

  singularEventsInfo.splice(0, singularEventsInfo.length, ...singularEvents);
  groupEventsInfo.splice(0, groupEventsInfo.length, ...groupEvents);
});
</script>

<template>
  <div :class="$style.scheduler">
    <IndicatorComponent />
    <TimelineComponent />
    <SingularEventWrapper
      v-for="singular in singularEventsInfo"
      :key="`event-${singular.eventIdx}`"
      :eventInfo="singular.eventInfo"
      :topOffset="singular.eventDimensions.topOffset"
      :eventHeight="singular.eventDimensions.eventHeight"
    />
    <GroupEventWrapper
      v-for="group in groupEventsInfo"
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
