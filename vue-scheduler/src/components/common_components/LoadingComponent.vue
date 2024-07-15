<script setup lang="ts"></script>

<template>
  <p :class="$style.loadingAnimation">Loading...</p>
</template>

<style lang="scss" module>
.loadingAnimation {
  font-size: 18px;
  font-weight: bold;
  color: var(--light-blue);
  display: inline-block;
  clip-path: inset(0 1ch 0 0);
  animation: loading 1s steps(4) infinite;
}

@keyframes loading {
  to {
    clip-path: inset(0 -1ch 0 0);
  }
}
</style>
