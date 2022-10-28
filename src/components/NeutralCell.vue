<script setup lang="ts">
import { ref } from "vue";

const emits = defineEmits<{
  (e: "click"): void;
}>();
const isRevealed = ref(false);
const leftClick = () => {
  if (isRevealed.value) return;
  isRevealed.value = true;
  emits("click");
};
</script>

<template>
  <button
    type="button"
    class="flex justify-center items-center w-12 h-12"
    :class="{
      'bg-neutral': isRevealed,
      'bg-base-200': !isRevealed,
    }"
    @click="leftClick"
  ></button>
</template>
