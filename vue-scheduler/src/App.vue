<script setup lang="ts">
import HeaderComponent from './components/header_component/HeaderComponent.vue';
import NewMeetingModal from './components/modal_components/NewMeetingModal.vue';
import InfoComponent from './components/info_component/InfoComponent.vue';
import SchedulerComponent from './components/scheduler_components/SchedulerComponent.vue';
import RoomStatus from './components/room_status_components/RoomStatus.vue';
import { computed, ref, watch } from 'vue';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { createNewEvent, fetchEvents } from './api/rest';
import type { EventInfo } from './types/EventInfo';
import { getOngoingEventIdx, handleTimeUntilFree } from './helpers/room_status_helper';

const showNewMeetingModal = ref(false);
const handleModalOpen = () => {
  if (isLoadingState.value || isErrorState.value || currentEvent.value) return;
  showNewMeetingModal.value = true;
};
const handleModalClose = () => {
  showNewMeetingModal.value = false;
};

// Handle async logic
const queryClient = useQueryClient();
const eventsQueryKey = 'events';
const isMutationError = ref(false);
const isMutationLoading = ref(false);

const { data, status } = useQuery({
  queryKey: [eventsQueryKey],
  queryFn: fetchEvents,
  refetchInterval: 300000,
  retry: 1
});

const { mutate } = useMutation({
  onMutate: () => {
    isMutationLoading.value = true;
    showNewMeetingModal.value = false;
    if (isMutationError.value) isMutationError.value = false;
  },
  mutationFn: (minutes: number) => createNewEvent(minutes),
  onSuccess: () => {
    invalidateFetchedEvents();
  },
  onError: () => {
    isMutationError.value = true;
  },
  onSettled: () => (isMutationLoading.value = false)
});

const isLoadingState = computed(() => isMutationLoading.value || status.value === 'pending');
const isErrorState = computed(() => isMutationError.value || status.value === 'error');

const invalidateFetchedEvents = () => {
  queryClient.invalidateQueries({ queryKey: [eventsQueryKey] });
};

// Handle current event logic
const currentEvent = ref<EventInfo | null>(null);
const currentMoment = ref(new Date());

setInterval(() => {
  const newMoment = new Date();
  if (currentEvent.value) {
    const timeUntilCurrentEventFinale = handleTimeUntilFree(currentEvent.value, newMoment);
    if (timeUntilCurrentEventFinale.minutesUntilFree === 0) currentEvent.value = null;
  }
  currentMoment.value = newMoment;
}, 15000);

watch(
  data,
  (newData) => {
    if (currentEvent.value || !newData) return;
    const currentEventIdx = getOngoingEventIdx(newData);
    if (currentEventIdx !== -1) currentEvent.value = newData[currentEventIdx];
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div :class="$style.app">
    <HeaderComponent />
    <NewMeetingModal
      v-if="showNewMeetingModal"
      @modal-close="handleModalClose"
      @event-create="mutate"
    />
    <div :class="$style.mainContainer">
      <RoomStatus
        :events="data || []"
        :currentEvent="currentEvent"
        :currentMoment="currentMoment"
        :isLoading="isLoadingState"
        :isError="isErrorState"
      />
      <InfoComponent
        :events="data || []"
        :current-event="currentEvent"
        room-name="Schlupfloch"
        :is-error="isErrorState"
        :is-loading="isLoadingState"
        @booking-modal-show="handleModalOpen"
      />
      <SchedulerComponent :events="data || []" />
    </div>
  </div>
</template>

<style lang="scss" module>
.app {
  height: calc(100vh - calc(2 * var(--page-p)));

  & > * {
    margin-bottom: var(--item-gap-size);
  }

  .mainContainer {
    display: grid;
    grid-template-columns: 1fr 0.25fr 0.75fr;
    gap: 1rem;
  }
}
</style>
