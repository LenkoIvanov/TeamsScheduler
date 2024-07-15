<script setup lang="ts">
interface ButtonProps {
  content: string;
  theme: 'purple' | 'green';
  disabled: boolean;
}

const props = defineProps<ButtonProps>();
const emit = defineEmits(['btn-click']);
</script>

<template>
  <div
    :class="[$style.button, props.disabled ? $style.isDisabled : '']"
    @click="emit('btn-click', 'im the payload')"
    :data-theme="props.theme"
  >
    {{ props.content }}
  </div>
</template>

<style lang="scss" module>
.button {
  display: block;
  text-align: center;
  padding: 1rem;
  border-radius: 20px;
  height: fit-content;
  cursor: pointer;
  color: var(--white);

  &[data-theme='purple'] {
    background-color: var(--light-purple);

    &:hover {
      background-color: var(--dark-purple);
    }

    &.isDisabled {
      background-color: var(--dark-purple);
      cursor: not-allowed;
    }
  }

  &[data-theme='green'] {
    background-color: var(--light-green);

    &:hover {
      background-color: var(--dark-green);
    }

    &.isDisabled {
      background-color: var(--dark-green);
      cursor: not-allowed;
    }
  }
}
</style>
