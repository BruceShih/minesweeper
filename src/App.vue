<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useGame, type Cell, type IndicatorCell } from "./composables/useGame";
import IndicatorCellComponent from "./components/IndicatorCell.vue";
import NeutralCellComponent from "./components/NeutralCell.vue";
import PrimedCellComponent from "./components/PrimedCell.vue";

const difficulty = ref<"-1" | "0" | "1" | "2" | "3">("-1");
const showCustomDifficulty = ref(false);
const gridWidth = ref(60);
const gridHeight = ref(25);
const mines = ref(150);

const game = useGame(gridWidth.value, gridHeight.value, mines.value);
const generated = ref(false);

const start = () => {
  switch (difficulty.value) {
    case "0":
      gridWidth.value = 9;
      gridHeight.value = 9;
      mines.value = 10;
      break;
    case "1":
      gridWidth.value = 16;
      gridHeight.value = 16;
      mines.value = 40;
      break;
    case "2":
      gridWidth.value = 30;
      gridHeight.value = 16;
      mines.value = 99;
      break;
    default:
      break;
  }

  game.generate();
  generated.value = true;
};
const toIndicatorCell = (cell: Cell) => {
  return cell as IndicatorCell;
};

watchEffect(() => {
  if (difficulty.value === "3") {
    showCustomDifficulty.value = true;
  } else {
    showCustomDifficulty.value = false;
  }
});
</script>

<template>
  <main class="container min-h-screen flex flex-col mx-auto py-8 bg-base-100">
    <h1 class="text-4xl font-bold mb-4">Minesweeper</h1>
    <div class="min-w-full flex justify-center items-end gap-4 mb-8">
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Difficulty</span>
        </label>
        <select
          class="select select-bordered w-full max-w-xs"
          v-model="difficulty"
        >
          <option value="-1" disabled selected>Select Difficulty</option>
          <option value="0">Easy (10 mines)</option>
          <option value="1">Medium (40 mines)</option>
          <option value="2">Hard (99 mines)</option>
          <option value="3">Custom</option>
        </select>
      </div>
      <div class="form-control w-32 max-w-xs" v-if="showCustomDifficulty">
        <label class="label">
          <span class="label-text">Grid Width</span>
        </label>
        <input
          type="text"
          placeholder="Grid Width"
          class="input input-bordered w-full max-w-xs"
          v-model="gridWidth"
        />
      </div>
      <div class="form-control w-32 max-w-xs" v-if="showCustomDifficulty">
        <label class="label">
          <span class="label-text">Grid Height</span>
        </label>
        <input
          type="text"
          placeholder="Grid Height"
          class="input input-bordered w-full max-w-xs"
          v-model="gridHeight"
          v-if="showCustomDifficulty"
        />
      </div>
      <div class="form-control w-32 max-w-xs" v-if="showCustomDifficulty">
        <label class="label">
          <span class="label-text">Mines</span>
        </label>
        <input
          type="text"
          placeholder="Mines"
          class="input input-bordered w-full max-w-xs"
          v-model="mines"
          v-if="showCustomDifficulty"
        />
      </div>
      <button type="button" class="btn btn-primary" @click="start">
        Start
      </button>
    </div>
    <div
      v-if="generated"
      class="card justify-center max-w-fit mx-auto bg-primary text-primary-content"
    >
      <div class="card-body gap-0 p-2">
        <div
          v-for="(h, i) in gridHeight"
          :key="i"
          class="flex max-w-fit max-h-fit"
        >
          <template v-for="(w, j) in gridWidth" :key="j">
            <template v-if="game.cells[i][j].type === 'Indicator'">
              <IndicatorCellComponent
                :indicator="toIndicatorCell(game.cells[i][j]).indicator"
                @click="game.revealCell(i, j)"
              />
            </template>
            <template v-if="game.cells[i][j].type === 'Neutral'">
              <NeutralCellComponent @click="game.revealCell(i, j)" />
            </template>
            <template v-if="game.cells[i][j].type === 'Primed'">
              <PrimedCellComponent
                @click="game.revealCell(i, j)"
                @right-click="game.flagCell(i, j)"
              />
            </template>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>
