<script setup lang="ts">
interface TimelineElementProps {
  currentHour: string;
}

const props = defineProps<TimelineElementProps>();
</script>

<template>
  <div :class="$style.timelineElementContainer">
    {{ props.currentHour }}
    <div :class="$style.singularLine"></div>
  </div>
</template>

<style lang="scss" module>
.timelineElementContainer {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--item-gap-size);
  width: 100%;
  height: var(--hour-in-px);

  .singularLine {
    width: 100%;
    border-bottom: 1px solid var(--white);
    margin-right: var(--item-gap-size);
  }
}
</style>
