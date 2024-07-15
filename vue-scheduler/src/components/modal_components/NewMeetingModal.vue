<script setup lang="ts">
import ModalSkeleton from './ModalSkeleton.vue';
import ButtonComponent from '../common_components/ButtonComponent.vue';
import { defineEmits, ref } from 'vue';
import { format } from 'date-fns';
import { oneMinuteInMiliseconds } from '@/helpers/constants';

const DropdownOptions = {
  fifteen: 15,
  thirty: 30,
  fortyFive: 45,
  sixty: 60
};
const selectedOption = ref(DropdownOptions.fifteen);

const emits = defineEmits(['modal-close', 'event-create']);

const currentTime = ref(new Date());
setInterval(() => {
  currentTime.value = new Date();
}, oneMinuteInMiliseconds);
</script>

<template>
  <ModalSkeleton title="Create a new meeting" @modal-close="emits('modal-close')">
    <template v-slot:children>
      <h3>
        <span :class="$style.startTime">Start:</span>
        {{ format(currentTime, 'HH:mm') }}
      </h3>
      <h3 :class="$style.infoRow">
        <span>Meeting duration:</span>
        <select v-model="selectedOption">
          <option v-for="option in DropdownOptions" :key="option" :value="option">
            {{ `${option}min` }}
          </option>
        </select>
      </h3>
      <div :class="$style.btnSection">
        <ButtonComponent
          content="Book now"
          theme="green"
          :disabled="false"
          @btn-click="emits('event-create', Number(selectedOption))"
        ></ButtonComponent>
      </div>
    </template>
  </ModalSkeleton>
</template>

<style lang="scss" module>
.startTime {
  color: var(--light-blue);
}

.infoRow {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: var(--light-blue);
  }

  select {
    width: 75px;
    height: 25px;

    &:focus-visible {
      outline: var(--light-blue) auto 1px;
    }
  }
}

.btnSection {
  width: 50%;
  margin-inline: auto;
}
</style>
