<script setup lang="ts">
import HeaderComponent from './components/header_component/HeaderComponent.vue';
import NewMeetingModal from './components/modal_components/NewMeetingModal.vue';
import InfoComponent from './components/info_component/InfoComponent.vue';
import SchedulerComponent from './components/scheduler_components/SchedulerComponent.vue';
import RoomStatus from './components/room_status_components/RoomStatus.vue';
import { TestData } from './helpers/constants';
import { ref } from 'vue';

const showNewMeetingModal = ref(false);

const handleModalOpen = () => {
  showNewMeetingModal.value = true;
};
const handleModalClose = () => {
  showNewMeetingModal.value = false;
};
const handleEventCreate = (minutes: number) => {
  showNewMeetingModal.value = false;
  console.log('create event for ', minutes);
};
</script>

<template>
  <div :class="$style.app">
    <HeaderComponent />
    <NewMeetingModal
      v-if="showNewMeetingModal"
      @modal-close="handleModalClose"
      @event-create="handleEventCreate"
    />
    <div :class="$style.mainContainer">
      <RoomStatus
        :events="[]"
        :currentEvent="null"
        :currentMoment="new Date()"
        :isLoading="false"
        :isError="false"
      />
      <InfoComponent
        :events="[]"
        :current-event="null"
        room-name="Schlupfloch"
        :is-error="false"
        :is-loading="false"
        @booking-modal-show="handleModalOpen"
      />
      <SchedulerComponent :events="TestData" />
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
