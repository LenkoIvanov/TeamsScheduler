<script setup lang="ts">
import type { EventInfo } from '@/types/EventInfo';
import { defineProps } from 'vue';
import ButtonComponent from '../common_components/ButtonComponent.vue';
import { roomStatusMessage } from '@/helpers/room_status_helper';

interface InfoSectionProps {
  currentEvent: EventInfo | null;
  events: EventInfo[];
  roomName: string;
  isError: boolean;
  isLoading: boolean;
}
const props = defineProps<InfoSectionProps>();
const { currentEvent, events, roomName, isError, isLoading } = props;

const emits = defineEmits(['booking-modal-show']);
</script>

<template>
  <div :class="$style.infoSection">
    <p>
      Room: <span :class="$style.roomName">{{ roomName }}</span>
    </p>
    <p>
      Status:
      <span :class="[currentEvent ? $style.status__booked : $style.status__free]">
        {{ roomStatusMessage(events, currentEvent).statusMsg }}
      </span>
    </p>
    <ButtonComponent
      :disabled="isError || isLoading || !!currentEvent"
      content="Book now"
      theme="green"
      @btn-click="emits('booking-modal-show')"
    />
  </div>
</template>

<style lang="scss" module>
.infoSection {
  margin-top: auto;

  & > * {
    margin-bottom: 5px;
  }

  .roomName {
    color: var(--light-blue);
  }

  .status {
    &__booked {
      color: var(--light-red);
    }
    &__free {
      color: var(--light-green);
    }
  }
}
</style>
