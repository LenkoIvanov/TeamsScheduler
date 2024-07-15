<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { EventInfo } from '@/types/EventInfo';
import ModalSkeleton from './ModalSkeleton.vue';
import { format } from 'date-fns';

interface MeetingInfoModalProps {
  eventInfo: EventInfo;
}

const props = defineProps<MeetingInfoModalProps>();
const emits = defineEmits(['modal-close']);
</script>

<template>
  <ModalSkeleton :title="props.eventInfo.subject" @modal-close="emits('modal-close')">
    <template v-slot:children>
      <h3 :class="$style.subtitleInfo">
        Start:<span>{{ format(props.eventInfo.startTime, 'HH:mm') }}</span>
      </h3>
      <h3 :class="$style.subtitleInfo">
        End:<span>{{ format(props.eventInfo.endTime, 'HH:mm') }}</span>
      </h3>
      <h3 :class="$style.subtitleInfo">
        Organizer:<span>{{ props.eventInfo.organizer }}</span>
      </h3>
    </template>
  </ModalSkeleton>
</template>

<style lang="scss" module>
.subtitleInfo {
  color: var(--light-blue);
  padding: 5px;

  span {
    color: var(--white);
    margin-left: 5px;
  }
}
</style>
