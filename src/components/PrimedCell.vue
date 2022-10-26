<script setup lang="ts">
import { ref } from "vue";
import IconFlag from "../components/Icons/IconFlag.vue";
import IconBomb from "../components/Icons/IconBomb.vue";

const emits = defineEmits<{
  (e: "click"): void;
  (e: "rightClick", payload: boolean): void;
}>();
const isRevealed = ref(false);
const isFlagged = ref(false);
const leftClick = () => {
  if (isRevealed.value) return;
  isRevealed.value = true;
  emits("click");
};
const rightClick = () => {
  isFlagged.value = !isFlagged.value;
  emits("rightClick", isFlagged.value);
};
</script>

<template>
  <button
    type="button"
    class="block w-12 h-12"
    :class="{
      'bg-error': isRevealed,
      'bg-neutral': !isRevealed && isFlagged,
      'bg-base-200': !isRevealed && !isFlagged,
    }"
    @click="leftClick"
    @click.right="rightClick"
  >
    <template v-if="isRevealed">
      <IconBomb />
    </template>
    <template v-else>
      <template v-if="isFlagged">
        <IconFlag />
      </template>
    </template>
  </button>
</template>
