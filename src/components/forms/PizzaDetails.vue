<script setup lang="ts">
import type { CartOffer, CartOfferAdditional, Pizza } from "@/types";
import { ref, onBeforeMount } from "vue";
import IngredientSelector from "@/components/forms/selectors/IngredientSelector.vue";

const $emit = defineEmits<{
  (e: "can-complete", v: boolean): void;
  (e: "set-offer", v: CartOffer): void;
}>();
const $props = defineProps<{ pizza: Pizza }>();

const cartOffer = ref<CartOffer>({
  qty: 1,
  type: "pizzas",
});
/**
 * handleOnReady
 * @param additionalIndex
 * @param ready
 */
function handleOnReady(additionalIndex: number, ready: boolean) {
  if (ready) {
    $emit("can-complete", true);
    $emit("set-offer", cartOffer.value);
  }
}
/**
 * handleSetAdditional
 * @param additionalIndex
 * @param value
 */
function handleSetAdditional(
  additionalIndex: number,
  value: CartOfferAdditional
) {
  if (cartOffer.value && cartOffer.value.additional) {
    cartOffer.value.additional[additionalIndex] = value;
    $emit("set-offer", cartOffer.value);
  }
}
/**
 * onBeforeMount
 */
onBeforeMount(() => {
  cartOffer.value = {
    qty: 1,
    type: "pizzas",
    additional: [
      {
        id: "1",
        selected: [],
      },
    ],
    offer: $props.pizza,
  };
});
</script>

<template>
  <div class="space-y-2">
    <div
      class="rounded-md bg-slate-200 p-2 text-center"
      v-if="pizza.restrictions"
    >
      {{ pizza.restrictions }}
    </div>
    <div
      v-if="pizza.ingredients.length"
      class="mt-2 rounded-md bg-slate-200 px-2 py-4 text-center"
    >
      <div class="text-lg font-semibold">Ingredientes Incluidos</div>
      <div class="mt-4 flex flex-wrap justify-center gap-2">
        <div
          class="rounded-xl bg-slate-300 p-2"
          v-for="(ingredient, iKey) in pizza.ingredients"
          :key="`pizza-ingredient-${iKey}`"
        >
          {{ ingredient }}
        </div>
      </div>
    </div>

    <!-- Additions -->
    <IngredientSelector
      :additional="pizza.additional[0]"
      @ready="(ready) => handleOnReady(0, ready)"
      @set-additional="(a) => handleSetAdditional(0, a)"
    />
    <!-- / Additions -->
  </div>
</template>
