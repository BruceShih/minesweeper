<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  indicator: number;
}>();
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
    class="block w-12 h-12"
    :class="{
      'bg-neutral': isRevealed,
      'bg-base-200': !isRevealed,
    }"
    @click="leftClick"
  >
    <template v-if="isRevealed">
      {{ props.indicator }}
    </template>
  </button>
</template>
