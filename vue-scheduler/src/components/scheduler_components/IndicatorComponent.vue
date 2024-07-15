<script setup lang="ts">
import {
  calculateEightAmOffset,
  indicatorId,
  indicatorMaxOffset
} from '@/helpers/scheduler_helper';

const calculateIndicatorOffset = (currentMoment: Date) => {
  const offsetCorrection = 4;
  const indicatorOffset = calculateEightAmOffset(currentMoment) - offsetCorrection;
  return indicatorOffset <= indicatorMaxOffset ? indicatorOffset : 0;
};
</script>

<template>
  <div
    :id="indicatorId"
    :style="{ top: `${calculateIndicatorOffset(new Date())}px` }"
    :class="$style.indicator"
  >
    <div :class="$style.indicatorCircle"></div>
    <div :class="$style.indicatorLine"></div>
  </div>
</template>

<style lang="scss" module>
.indicator {
  display: flex;
  align-items: center;
  position: absolute;
  width: 80%;
  margin-left: calc(var(--item-gap-size) * 2.5);
  margin-right: var(--item-gap-size);
  z-index: 5;

  .indicatorLine {
    width: 100%;
    border-top: 3px solid var(--light-blue);
  }

  .indicatorCircle {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: var(--light-blue);
  }
}
</style>
