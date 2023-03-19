<script setup lang="ts">
import { ref } from "vue";
import type {
  ICartOfferAdditional,
  IDataAdditional,
  IIngredient,
} from "@/types";
import { useDataStore } from "@/store";
import SimpleSelector from "./SimpleSelector.vue";

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
          qty: 1,
          id: ingredient.id,
        });
    }
  });
}
</script>

<template>
  <div class="rounded-lg bg-slate-200 py-4 px-8">
    <div class="text-lg font-semibold">
      {{ additional.title }}
    </div>
    <div class="mt-2">
      <SimpleSelector
        class="my-4"
        :price="ing.price"
        :label="ing.name"
        :selected="isSelected(ing.id)"
        @update:selected="() => handleSelect(ing.id)"
        v-for="(ing, iKey) in ingredients"
        :key="`ingredient2-${iKey}-${ing.id}`"
      />
    </div>
  </div>
</template>
