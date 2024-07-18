<script setup lang="ts">
interface SeparatorProps {
  turns: number;
}
const props = defineProps<SeparatorProps>();
</script>

<template>
  <div :style="{ transform: `rotate(${props.turns}turn)` }" :class="$style.separator"></div>
</template>

<style lang="scss" module>
.separator {
  position: absolute;
  height: 100%;
  background: var(--dark-purple);
  width: 10px;
}
</style>
