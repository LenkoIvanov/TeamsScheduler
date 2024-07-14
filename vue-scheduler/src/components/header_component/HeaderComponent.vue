<script setup lang="ts">
  import { format } from "date-fns";
  const currentDate = new Date();
</script>

<template>
    <div :class="$style.header">
      <div :class="$style.dateInfo">
        <p :class="$style.date">{{format(currentDate, "dd.MM.yyyy")}}</p>
        <p>{{format(currentDate, "eeee")}}</p> <!--- Returns day of week --->
      </div>
    </div>
</template>

<style lang="scss" module>
  .header {
    display: flex;
    align-items: center;

    .dateInfo {
      margin-left: auto;
      text-align: end;
      color: var(--white);

      p {
        margin: auto;
      }

      .date {
        color: var(--light-blue);
      }
    }
  }
</style>