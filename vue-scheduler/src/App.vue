<script setup lang="ts">
import HeaderComponent from './components/header_component/HeaderComponent.vue';
import ButtonComponent from './components/common_components/ButtonComponent.vue';
import LoadingComponent from './components/common_components/LoadingComponent.vue';
import ModalSkeleton from './components/modal_components/ModalSkeleton.vue';
import MeetingInfoModal from './components/modal_components/MeetingInfoModal.vue';
import { ref } from 'vue';
import type { EventInfo } from './types/EventInfo';
import NewMeetingModal from './components/modal_components/NewMeetingModal.vue';

const showModal = ref(false);

const handleModalOpen = () => {
  showModal.value = true;
};
const handleModalClose = () => {
  showModal.value = false;
};
const handleEventCreate = (minutes: number) => {
  showModal.value = false;
  console.log('create event for ', minutes);
};

const testEventInfo: EventInfo = {
  subject: 'TestData',
  organizer: 'Test',
  startTime: new Date(),
  endTime: new Date()
};
</script>

<template>
  <div :class="$style.app">
    <HeaderComponent />
    <h1>Hello World</h1>
    <ButtonComponent content="Test" theme="green" :disabled="false" @btn-click="handleModalOpen" />
    <LoadingComponent />
    <NewMeetingModal
      v-if="showModal"
      @modal-close="handleModalClose"
      @event-create="handleEventCreate"
    >
    </NewMeetingModal>
  </div>
</template>

<style lang="scss" module>
.app {
  height: calc(100vh - calc(2 * var(--page-p)));

  & > * {
    margin-bottom: var(--item-gap-size);
  }
}
</style>
