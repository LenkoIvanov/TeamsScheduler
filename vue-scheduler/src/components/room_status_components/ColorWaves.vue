<script setup lang="ts">
interface ColorWavesProps {
  isBooked: boolean;
}
const props = defineProps<ColorWavesProps>();
</script>

<template>
  <div :class="$style.colorWaveWrapper">
    <div
      :class="[$style.colorWave, $style.firstChild, props.isBooked ? $style.firstBooked : '']"
    ></div>
    <div :class="[$style.colorWave, $style.secondChild]"></div>
    <div
      :class="[$style.colorWave, $style.thirdChild, props.isBooked ? $style.thirdBooked : '']"
    ></div>
  </div>
</template>

<style lang="scss" module>
.colorWaveWrapper {
  height: 100%;
  width: 100%;
  position: relative;

  .colorWave {
    position: absolute;
    inset: 0px;
    border: 10px solid transparent;
    border-radius: 115% 140% 145% 110%/125% 140% 110% 125%;
    mix-blend-mode: screen;

    &.firstChild {
      border-color: var(--light-green);
      transform-origin: 50% 50%;
      animation: spin1 5.5s linear infinite;

      &.firstBooked {
        border-color: var(--light-red);
      }
    }

    &.secondChild {
      border-width: 15px;
      border-color: var(--light-purple);
      transform-origin: 50% 50%;
      animation: spin2 5.5s linear infinite;
    }

    &.thirdChild {
      border-color: var(--dark-green);
      transform-origin: 50% 50%;
      animation: spin3 5.5s linear infinite;

      &.thirdBooked {
        border-color: var(--dark-red);
      }
    }
  }
}

@keyframes spin1 {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin2 {
  0% {
    transform: rotate(72deg);
  }

  100% {
    transform: rotate(-288deg);
  }
}

@keyframes spin3 {
  0% {
    transform: rotate(-144deg);
  }

  100% {
    transform: rotate(216deg);
  }
}
</style>
