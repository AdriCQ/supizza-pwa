<script setup lang="ts">
import { useDataStore } from "@/helpers/pinia";
import { IPizza } from "@/types";
import { computed, ref, onBeforeMount } from "vue";

const $dataStore = useDataStore();
const $emit = defineEmits<{ (e: "can-complete", v: boolean): void }>();
const $props = defineProps<{ pizza: IPizza }>();

const countSelected = computed(() => {
  let counter = 0;
  selected.value.forEach((s) => {
    if (s) counter++;
  });
  return counter;
});
const ingredients = computed(() => $dataStore.ingredients);
const selected = ref<boolean[]>([]);
/**
 * handleSelect
 * @param ingredient
 */
function handleSelect(ingredient: number) {
  const max = $props.pizza.additional[0].max ?? 0;
  const min = $props.pizza.additional[0].min ?? 0;
  // Prevent add more than required
  if (countSelected.value < max)
    selected.value[ingredient] = !selected.value[ingredient];
  else selected.value[ingredient] = false;
  // Check if can complete
  if (countSelected.value <= max && countSelected.value >= min)
    $emit("can-complete", true);
  else $emit("can-complete", false);
}

onBeforeMount(() => {
  ingredients.value?.forEach(() => {
    selected.value.push(false);
  });
});
</script>

<template>
  <div class="space-y-2">
    <div class="rounded-sm bg-red-200 p-2">{{ pizza.restrictions }}</div>

    <!-- Additions -->
    <div
      class="mt-2"
      v-for="(add, aKey) in pizza.additional"
      :key="`additional-${aKey}`"
    >
      <div class="my-2">{{ add.title }}</div>
      <div class="flex flex-wrap gap-2">
        <div
          :class="`rounded-full p-2 ${
            selected[iKey] ? 'bg-primary' : 'bg-slate-100'
          }`"
          v-for="(ing, iKey) in ingredients"
          :key="`ingredient-${iKey}-${ing.id}`"
          @click="handleSelect(iKey)"
        >
          {{ ing.name }}
        </div>
      </div>
    </div>
    <!-- / Additions -->
  </div>
</template>
