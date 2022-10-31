<script setup lang="ts">
import { useVModel } from "@vueuse/core";

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
  (e: "update:reveal", payload: boolean): void;
  (e: "update:flag", payload: boolean): void;
}>();

const isRevealed = useVModel(props, "reveal", emits);
const isFlagged = useVModel(props, "flag", emits);

const leftClick = () => {
  if (isRevealed.value) return;
  isRevealed.value = true;
};
const rightClick = (e: MouseEvent) => {
  e.preventDefault();
  isFlagged.value = !isFlagged.value;
};
</script>

<template>
  <button
    type="button"
    class="btn btn-sm btn-square flex justify-center items-center w-8 h-8"
    :class="{
      'btn-active': isRevealed,
      'bg-base-200': !isRevealed,
    }"
    @click="leftClick"
    @click.right="rightClick"
  ></button>
</template>
