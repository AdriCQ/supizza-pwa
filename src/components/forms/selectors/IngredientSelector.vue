<script setup lang="ts">
import { ref } from "vue";
import type {
  ICartOfferAdditional,
  IDataAdditional,
  IIngredient,
} from "@/types";
import { useDataStore } from "@/helpers/pinia";

const $emit = defineEmits<{
  (e: "set-additional", v: ICartOfferAdditional): void;
  (e: "ready", v: boolean): void;
}>();
const $props = defineProps<{ additional: IDataAdditional }>();

// Available ingredients
const { ingredients } = useDataStore();
// Object constructor to parent emit
const offerAdditional = ref<ICartOfferAdditional>();
// list selected ingredients keys
const selected = ref<number[]>([]);
/**
 * handleSelect
 * @param ingredient
 */
function handleSelect(ingredient: number) {
  const max = $props.additional.max ?? 0;
  const min = $props.additional.min ?? 0;
  // Prevent add more than required
  if (selected.value.length < max) {
    toggleSelect(ingredient);
  } else setSelected(ingredient, false);
  // Check if can complete
  if (selected.value.length <= max && selected.value.length >= min)
    $emit("ready", true);
  else $emit("ready", false);
  prepareCartOffer();
  if (offerAdditional.value) $emit("set-additional", offerAdditional.value);
}
/**
 * isSelected
 * @param ingredient
 * @return boolean
 */
function isSelected(ingredient: number): boolean {
  return selected.value.findIndex((s) => s === ingredient) >= 0;
}
/**
 * setSelected
 * @param ingredient
 */
function setSelected(ingredient: number, s: boolean) {
  // Add
  if (s && !isSelected(ingredient)) {
    selected.value.push(ingredient);
  }
  // remove
  else {
    const index = selected.value.findIndex((s) => s === ingredient);
    selected.value.splice(index, 1);
  }
}
/**
 * toggleSelect
 * @param ingredient
 */
function toggleSelect(ingredient: number) {
  if (isSelected(ingredient)) {
    const index = selected.value.findIndex((s) => s === ingredient);
    selected.value.splice(index, 1);
  } else {
    selected.value.push(ingredient);
  }
}
/**
 * prepareCartOffer
 */
function prepareCartOffer() {
  offerAdditional.value = {
    id: 1,
    selected: [],
  };
  selected.value.forEach((sId) => {
    if (ingredients && ingredients.findIndex((i) => i.id === sId) >= 0) {
      const ingredient = ingredients.find((i) => i.id === sId) as IIngredient;
      if (offerAdditional.value)
        offerAdditional.value.selected.push({
          desc: ingredient.desc,
          name: ingredient.name,
          price: ingredient.price,
        });
    }
  });
}
</script>

<template>
  <div class="my-2">{{ additional.title }}</div>
  <div class="flex flex-wrap gap-2">
    <div
      :class="`rounded-full p-2 ${
        isSelected(ing.id) ? 'bg-primary' : 'bg-slate-100'
      }`"
      v-for="(ing, iKey) in ingredients"
      :key="`ingredient-${iKey}-${ing.id}`"
      @click="handleSelect(ing.id)"
    >
      {{ ing.name }}
    </div>
  </div>
</template>
