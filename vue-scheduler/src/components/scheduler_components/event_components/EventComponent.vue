<script setup lang="ts">
import MeetingInfoModal from '@/components/modal_components/MeetingInfoModal.vue';
import type { EventInfo } from '@/types/EventInfo';
import { ref } from 'vue';

interface EventProps {
  eventInfo: EventInfo;
}
const props = defineProps<EventProps>();

const showInfoModal = ref(false);
const handleOpenInfoModal = () => {
  showInfoModal.value = true;
};
const handleCloseInfoModal = () => {
  showInfoModal.value = false;
};
</script>

<template>
  <MeetingInfoModal
    v-if="showInfoModal"
    :eventInfo="props.eventInfo"
    @modal-close="handleCloseInfoModal"
  />
  <div @click="handleOpenInfoModal" :class="$style.eventContainer">
    <p :class="$style.title">{{ props.eventInfo.subject }}</p>
  </div>
</template>

<style lang="scss" module>
.eventContainer {
  height: 100%;
  border-radius: 8px;
  border: 1px solid var(--light-blue);
  background-color: var(--light-purple);
  color: var(--white);
  text-align: center;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  overflow: hidden;
  cursor: pointer;
  container-type: size;

  .title {
    padding-bottom: 3px;
  }
}
</style>
