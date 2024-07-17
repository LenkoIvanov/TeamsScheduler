<script setup lang="ts">
import { toRefs } from 'vue';

interface SeparatorProps {
  turns: number;
}
const props = defineProps<SeparatorProps>();
const { turns } = toRefs(props);
</script>

<template>
  <div :style="{ transform: `rotate(${turns}turn)` }" :class="$style.separator"></div>
</template>

<style lang="scss" module>
.separator {
  position: absolute;
  height: 100%;
  background: var(--dark-purple);
  width: 10px;
}
</style>
