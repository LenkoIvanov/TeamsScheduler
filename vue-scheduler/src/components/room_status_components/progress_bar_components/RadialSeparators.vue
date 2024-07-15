<script setup lang="ts">
import SeparatorComponent from './SeparatorComponent.vue';
interface RadialSeparatorsProps {
  count: number;
}
const props = defineProps<RadialSeparatorsProps>();
const { count } = props;

const countForMirroringSeparators = count / 2 - 1;
const turns = 1 / countForMirroringSeparators;

const separatorKeys = Array.from(Array(countForMirroringSeparators).keys());
</script>

<template>
  <div :class="$style.radialSeparatorsContainer">
    <SeparatorComponent
      v-for="(key, idx) in separatorKeys"
      :key="idx"
      :turns="idx * turns"
    ></SeparatorComponent>
  </div>
</template>

<style lang="scss" module>
.radialSeparatorsContainer {
  position: relative;
  width: 95%;
  height: 100%;
  top: -50%;
  left: 95%;
  transform: translate(-50%, -50%);
}
</style>
