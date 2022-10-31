<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import IconFlag from "../components/Icons/IconFlag.vue";
import IconBomb from "../components/Icons/IconBomb.vue";

const props = withDefaults(
  defineProps<{
    reveal: boolean;
    flag: boolean;
  }>(),
  {
    reveal: false,
    flag: false,
  }
);

const emits = defineEmits<{
  (e: "update:reveal"): void;
  (e: "update:flag"): void;
}>();

const isRevealed = useVModel(props, "reveal", emits);
const isFlagged = useVModel(props, "flag", emits);

const leftClick = () => {
  if (isRevealed.value) return;
  isRevealed.value = true;
};
const rightClick = () => {
  isFlagged.value = !isFlagged.value;
};
</script>

<template>
  <button
    type="button"
    class="flex justify-center items-center w-12 h-12"
    :class="{
      'bg-error': isRevealed,
      'bg-neutral': !isRevealed && isFlagged,
      'bg-base-200': !isRevealed && !isFlagged,
    }"
    @click="leftClick"
    @click.right="rightClick"
  >
    <slot name="bomb">
      <IconBomb />
    </slot>
    <slot name="flag">
      <IconFlag />
    </slot>
    <slot name="indicator" />
  </button>
</template>
