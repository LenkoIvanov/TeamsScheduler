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
  <SeparatorComponent
    v-for="(key, idx) in separatorKeys"
    :key="idx"
    :turns="idx * turns"
  ></SeparatorComponent>
</template>
